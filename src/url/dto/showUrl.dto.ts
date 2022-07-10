export class ShowUrlDto {
    original_url:string
    short_url:string
    clicks_num:number

    constructor(orig_url, sh_url, clicks) {
        this.original_url = orig_url;
        this.short_url = sh_url;
        this.clicks_num = clicks;
    }
}