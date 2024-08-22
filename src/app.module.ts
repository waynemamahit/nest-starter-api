import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AbilityModule } from './modules/ability/ability.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    AbilityModule,
    AuthModule,
  ],
})
export class AppModule {}
