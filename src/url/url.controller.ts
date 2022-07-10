import { Body, Controller, Get, Param, Post,Res,UsePipes,ValidationPipe, HttpStatus} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/createUrl.dto';
import { Response } from 'express';

@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {}

    @UsePipes(new ValidationPipe())

    //роут на укорачивание урла
    @Post('/shorten')
    
    async create(@Body() createUrlDto: CreateUrlDto): Promise<any> {
        return this.UrlService.createShortUrl(createUrlDto);
    }

    // роут на редирект по короткому урлу
    @Get('/:code')
    async redirectToUrl(
        @Param('code') code: string,
        @Res() res: Response,
    ): Promise<any> {
        const url = await this.UrlService.findByCode(code);
        await this.UrlService.updateUrl(code);
        return res.redirect(HttpStatus.PERMANENT_REDIRECT, url.original_url);
    }
}
