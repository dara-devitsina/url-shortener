import { BadRequestException, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UrlEntity} from "./url.entity";
import {Repository} from "typeorm";
import generateRandomCode from '../helpers/generateRandomCode';
import { LOCAL_DOMAIN, PORT } from '../config/';
import { ShowUrlDto } from './dto/showUrl.dto'

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>
    ) {}

    async createShortUrl(dto): Promise<ShowUrlDto>  {
        let existingCustomLink = null;
        // еслм приходит кастомная ссылка, то проверяем ее наличие в базе
        if (dto.custom_link) {
            existingCustomLink = await this.urlRepository.findOneBy({ code: dto.custom_link });
            if (existingCustomLink) {
                 throw new BadRequestException("Такая ссылка уже есть, придумайте другое название!")
            }
        }
        const existingUrl = await this.urlRepository.findOneBy({ original_url: dto.original_url });
        if (existingUrl && !dto.custom_link) {
            return new ShowUrlDto(existingUrl.original_url, existingUrl.short_url, existingUrl.clicks_num)
        }

        const randomCode = await generateRandomCode(this.urlRepository)

        const code = dto.custom_link ? dto.custom_link : randomCode;
        const newShortUrl = this.urlRepository.create({
            code,
            original_url: dto.original_url,
            short_url: `${LOCAL_DOMAIN}/${code}`,
            clicks_num: 0,
        });
        const result = await this.urlRepository.save(newShortUrl);
        return new ShowUrlDto(result.original_url, result.short_url, result.clicks_num);
    }

    // toDo обновление кол-ва кликов
    async updateUrl(code: string): Promise<ShowUrlDto> {
        const url = await this.findByCode(code)
        url.clicks_num = url.clicks_num += 1;
        return this.urlRepository.save(url) // UPDATE
    }

    async findByCode(code: string): Promise<ShowUrlDto> {
        const result = await this.urlRepository.findOneBy({code});
        if (!result) {
            throw new BadRequestException("Такой ссылки не существует!")
        }
        return result;
    }
}
