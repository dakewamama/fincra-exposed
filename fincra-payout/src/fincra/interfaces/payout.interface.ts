import { FincraResponse } from './business.interface';

export interface PayoutData {
  id: string;
  reference: string;
  customerReference: string;
  status: 'pending' | 'processing' | 'successful' | 'failed' | 'cancelled';
  amount: number;
  sourceCurrency: string;
  destinationCurrency: string;
  fee: number;
  totalAmount: number;
  paymentDestination: string;
  createdAt: string;
  updatedAt: string;
}

export type PayoutResponse = FincraResponse<PayoutData>;

export interface PayoutListResponse {
  status: boolean;
  message: string;
  data: PayoutData[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}