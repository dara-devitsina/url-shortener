import { IsUrl, Length } from 'class-validator';

export class CreateUrlDto {
    @IsUrl()
    @Length(1, 2000)
    original_url: string;
    custom_link?: string;
}