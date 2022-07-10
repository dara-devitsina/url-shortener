import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/url/url.service.spec.ts
import { UrlService } from './url.service';
========
import { CommandRunnerService } from './command.service';
>>>>>>>> 67253824faa432b3bdd796504bf7703ba9d08d64:src/command/command.service.spec.ts

describe('UsersService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
