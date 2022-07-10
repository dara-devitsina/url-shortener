import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UrlModule} from './url/url.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import config from './config'
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => configService.get('DB')
        }),
        UrlModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}