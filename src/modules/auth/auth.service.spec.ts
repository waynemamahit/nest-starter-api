import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { authModuleMetadata } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(authModuleMetadata).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
