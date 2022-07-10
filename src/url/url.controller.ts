import { Body, Controller, Post, UsePipes,ValidationPipe} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/createUrl.dto';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @UsePipes(new ValidationPipe())

    //роут на укорачивание урла
    @Post('/shorten')
    async create(@Body() createUrlDto: CreateUrlDto): Promise<any> {
        return this.urlService.createShortUrl(createUrlDto);
    }
}
