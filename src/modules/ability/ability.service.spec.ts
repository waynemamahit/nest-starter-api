import { Test, TestingModule } from '@nestjs/testing';
import { AbilityService } from './ability.service';
import { abilityModuleMetadata } from './ability.module';

describe('AbilityService', () => {
  let service: AbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      abilityModuleMetadata,
    ).compile();

    service = module.get<AbilityService>(AbilityService);
  });

  it('should service be defined', () => {
    expect(service).toBeDefined();
  });
});
