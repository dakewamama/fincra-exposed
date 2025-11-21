import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FincraModule } from './fincra/fincra.module';
import { HealthModule } from './health/health.module';
import { validationSchema } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    FincraModule,
    HealthModule,
  ],
})
export class AppModule {}