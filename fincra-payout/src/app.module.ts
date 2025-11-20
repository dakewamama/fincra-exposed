import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FincraModule } from './fincra/fincra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FincraModule,
  ],
})
export class AppModule {}