import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UrlEntity} from "./url.entity";

@Module({
  // This module uses the forFeature() method to define which repositories are registered in the current scope.
  imports: [
    TypeOrmModule.forFeature([UrlEntity])
  ],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
