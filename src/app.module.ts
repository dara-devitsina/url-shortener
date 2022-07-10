import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { UrlService } from './url/url.service';
import {UrlModule} from './url/url.module';
import {UrlEntity} from "./url/url.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import config from './config'
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([UrlEntity]),
        ConfigModule.forRoot({
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => configService.get('DB')
        }),
        UrlModule],
    exports: [TypeOrmModule],
    controllers: [AppController],
    providers: [AppService, UrlService],
})
export class AppModule {
}