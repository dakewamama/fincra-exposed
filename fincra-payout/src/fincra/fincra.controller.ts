import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FincraService } from './fincra.service';
import { BusinessResponse } from './interfaces/business.interface';
import { WalletResponse } from './interfaces/wallet.interface';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { PayoutResponse } from './interfaces/payout.interface';

@Controller('fincra')
export class FincraController {
  constructor(private readonly fincraService: FincraService) {}

  @Get('business')
  async getBusinessId(): Promise<BusinessResponse> {
    return this.fincraService.getBusinessId();
  }

  @Get('wallets/:businessId')
  async getWalletBalance(@Param('businessId') businessId: string): Promise<WalletResponse> {
    return this.fincraService.getWalletBalance(businessId);
  }

  @Post('payouts')
  async createPayout(@Body() dto: CreatePayoutDto): Promise<PayoutResponse> {
    return this.fincraService.createPayout(dto);
  }
}