import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FincraService } from './fincra.service';
import { FincraController } from './fincra.controller';

@Module({
  imports: [ConfigModule],
  controllers: [FincraController],
  providers: [FincraService],
  exports: [FincraService],
})
export class FincraModule {}