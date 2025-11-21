import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosError } from 'axios';

import { BusinessResponse } from './interfaces/business.interface';
import { WalletResponse } from './interfaces/wallet.interface';

import { CreatePayoutDto } from './dto/create-payout.dto';
import { PayoutResponse, PayoutListResponse } from './interfaces/payout.interface';
import { WalletToWalletDto } from './dto/wallet-to-wallet.dto';

import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { BeneficiaryResponse, BeneficiaryListResponse } from './interfaces/beneficiary.interface';

import { BankListResponse, CurrencyListResponse, CountryListResponse } from './interfaces/reference.interface';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { RateResponse, QuoteResponse } from './interfaces/quote.interface';



@Injectable()
export class FincraService {
  private readonly client: AxiosInstance;

  constructor(private config: ConfigService) {
    const apiKey = this.config.get<string>('FINCRA_API_KEY');
    const baseUrl = this.config.get<string>('FINCRA_BASE_URL', 'https://sandboxapi.fincra.com');

    if (!apiKey) {
      throw new Error('FINCRA_API_KEY is required');
    }

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      timeout: 30000,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return this.handleError(error);
      },
    );
  }

  private handleError(error: AxiosError): never {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorData: any = error.response?.data || {};
    const message = errorData.message || error.message || 'Fincra API request failed';
    
    throw new HttpException(
      {
        statusCode: status,
        message,
        error: error.response?.data,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }

  async getBusinessId(): Promise<BusinessResponse> {
    const response = await this.client.get('/profile/business/me');
    return response.data;
  }

  async getWalletBalance(businessId: string): Promise<WalletResponse> {
    const response = await this.client.get(`/profile/business/${businessId}/wallets`);
    return response.data;
  }

  async createPayout(dto: CreatePayoutDto): Promise<PayoutResponse> {
    const response = await this.client.post('/disbursements/payouts', dto);
    return response.data;
  }

  async fetchPayoutByReference(reference: string): Promise<PayoutResponse> {
    const response = await this.client.get(`/disbursements/payouts/${reference}`);
    return response.data;
  }

  async fetchPayoutByCustomerReference(customerReference: string): Promise<PayoutResponse> {
    const response = await this.client.get(`/disbursements/payouts/by-customer-reference/${customerReference}`);
    return response.data;
  }

  async listPayouts(params?: { page?: number; perPage?: number; status?: string }): Promise<PayoutListResponse> {
    const response = await this.client.get('/disbursements/payouts', { params });
    return response.data;
  }

  async walletToWalletTransfer(dto: WalletToWalletDto): Promise<PayoutResponse> {
    const response = await this.client.post('/disbursements/wallet-to-wallet', dto);
    return response.data;
  }

  async createBeneficiary(dto: CreateBeneficiaryDto): Promise<BeneficiaryResponse> {
    const response = await this.client.post('/profile/beneficiaries/business', dto);
    return response.data;
  }

  async listBeneficiaries(businessId: string, params?: { page?: number; perPage?: number }): Promise<BeneficiaryListResponse> {
    const response = await this.client.get(`/profile/beneficiaries/business/${businessId}`, { params });
    return response.data;
  }

  async fetchBeneficiary(beneficiaryId: string): Promise<BeneficiaryResponse> {
    const response = await this.client.get(`/profile/beneficiaries/${beneficiaryId}`);
    return response.data;
  }

  async updateBeneficiary(beneficiaryId: string, dto: UpdateBeneficiaryDto): Promise<BeneficiaryResponse> {
    const response = await this.client.patch(`/profile/beneficiaries/${beneficiaryId}`, dto);
    return response.data;
  }

  async deleteBeneficiary(beneficiaryId: string) {
    const response = await this.client.delete(`/profile/beneficiaries/${beneficiaryId}`);
    return response.data;
  }

  async listBanks(params?: { country?: string; currency?: string; type?: string }): Promise<BankListResponse> {
    const response = await this.client.get('/core/banks', { params });
    return response.data;
  }

  async getSupportedCurrencies(): Promise<CurrencyListResponse> {
    const response = await this.client.get('/core/currencies');
    return response.data;
  }
  
  async getExchangeRate(sourceCurrency: string, destinationCurrency: string): Promise<RateResponse> {
    const response = await this.client.get('/core/rates', {
      params: { sourceCurrency, destinationCurrency },
    });
    return response.data;
  }

  async createQuote(dto: CreateQuoteDto): Promise<QuoteResponse> {
    const response = await this.client.post('/core/quotes', dto);
    return response.data;
  }

  async getSupportedCountries(): Promise<CountryListResponse> {
    const response = await this.client.get('/core/countries');
    return response.data;
  }
}