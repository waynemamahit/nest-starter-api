import { Module, ModuleMetadata } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export const authModuleMetadata: ModuleMetadata = {
  controllers: [AuthController],
  providers: [AuthService],
};
@Module(authModuleMetadata)
export class AuthModule {}
