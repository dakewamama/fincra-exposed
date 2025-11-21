import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosError } from 'axios';

import { BusinessResponse } from './interfaces/business.interface';
import { WalletResponse } from './interfaces/wallet.interface';

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
}