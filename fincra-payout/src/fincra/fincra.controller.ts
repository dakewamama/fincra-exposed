import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { FincraService } from './fincra.service';
import { BusinessResponse } from './interfaces/business.interface';
import { WalletResponse } from './interfaces/wallet.interface';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { WalletToWalletDto } from './dto/wallet-to-wallet.dto';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { PayoutResponse, PayoutListResponse } from './interfaces/payout.interface';
import { BeneficiaryResponse, BeneficiaryListResponse } from './interfaces/beneficiary.interface';
import { BankListResponse, CurrencyListResponse } from './interfaces/reference.interface';

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

  @Get('payouts')
  async listPayouts(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('status') status?: string,
  ): Promise<PayoutListResponse> {
    return this.fincraService.listPayouts({ page, perPage, status });
  }

  @Post('payouts/wallet-to-wallet')
  async walletToWalletTransfer(@Body() dto: WalletToWalletDto): Promise<PayoutResponse> {
    return this.fincraService.walletToWalletTransfer(dto);
  }

  @Get('payouts/by-customer-reference/:customerReference')
  async fetchPayoutByCustomerReference(@Param('customerReference') customerReference: string): Promise<PayoutResponse> {
    return this.fincraService.fetchPayoutByCustomerReference(customerReference);
  }

  @Get('payouts/:reference')
  async fetchPayoutByReference(@Param('reference') reference: string): Promise<PayoutResponse> {
    return this.fincraService.fetchPayoutByReference(reference);
  }

  @Post('beneficiaries')
  async createBeneficiary(@Body() dto: CreateBeneficiaryDto): Promise<BeneficiaryResponse> {
    return this.fincraService.createBeneficiary(dto);
  }

  @Get('beneficiaries/business/:businessId')
  async listBeneficiaries(
    @Param('businessId') businessId: string,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ): Promise<BeneficiaryListResponse> {
    return this.fincraService.listBeneficiaries(businessId, { page, perPage });
  }

  @Get('beneficiaries/:beneficiaryId')
  async fetchBeneficiary(@Param('beneficiaryId') beneficiaryId: string): Promise<BeneficiaryResponse> {
    return this.fincraService.fetchBeneficiary(beneficiaryId);
  }

  @Patch('beneficiaries/:beneficiaryId')
  async updateBeneficiary(
    @Param('beneficiaryId') beneficiaryId: string,
    @Body() dto: UpdateBeneficiaryDto,
  ): Promise<BeneficiaryResponse> {
    return this.fincraService.updateBeneficiary(beneficiaryId, dto);
  }

  @Delete('beneficiaries/:beneficiaryId')
  async deleteBeneficiary(@Param('beneficiaryId') beneficiaryId: string) {
    return this.fincraService.deleteBeneficiary(beneficiaryId);
  }

  @Get('banks')
  async listBanks(
    @Query('country') country?: string,
    @Query('currency') currency?: string,
    @Query('type') type?: string,
  ): Promise<BankListResponse> {
    return this.fincraService.listBanks({ country, currency, type });
  }

  @Get('currencies')
  async getSupportedCurrencies(): Promise<CurrencyListResponse> {
    return this.fincraService.getSupportedCurrencies();
  }
}