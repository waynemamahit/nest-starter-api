import { Module, ModuleMetadata } from '@nestjs/common';
import { PrismaService } from '../../common/providers/prisma.service';
import { AbilityService } from './ability.service';

export const abilityModuleMetadata: ModuleMetadata = {
  providers: [AbilityService, PrismaService],
};
@Module(abilityModuleMetadata)
export class AbilityModule {}
