import { Controller, Get } from '@nestjs/common';
import { FincraService } from './fincra.service';
import { BusinessResponse } from './interfaces/business.interface';

@Controller('fincra')
export class FincraController {
  constructor(private readonly fincraService: FincraService) {}

  @Get('business')
  async getBusinessId(): Promise<BusinessResponse> {
    return this.fincraService.getBusinessId();
  }
}