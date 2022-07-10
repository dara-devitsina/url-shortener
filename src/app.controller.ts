import { Controller, Get, Module,  Param, Res, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';
import { Response } from 'express';

@Module({
  imports: [AppService ],
  providers: [AppService],
})

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

    // роут на редирект по короткому урлу
    @Get('/:code')
    async redirectToUrl(
        @Param('code') code: string,
        @Res() res: Response,
    ): Promise<any> {
        const url = await this.urlService.findByCode(code);
        await this.urlService.updateUrl(code);
        return res.redirect(HttpStatus.PERMANENT_REDIRECT, url.original_url);
    }
}