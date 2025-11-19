import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FincraService } from './fincra.service';

@Module({
  imports: [ConfigModule],
  providers: [FincraService],
  exports: [FincraService],
})
export class FincraModule {}