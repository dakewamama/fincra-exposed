import { FincraResponse } from './business.interface';

export interface RateData {
  sourceCurrency: string;
  destinationCurrency: string;
  rate: number;
  inverseRate: number;
}

export type RateResponse = FincraResponse<RateData>;

export interface QuoteData {
  id: string;
  business: string;
  sourceCurrency: string;
  destinationCurrency: string;
  sourceAmount: number;
  destinationAmount: number;
  rate: number;
  fee: number;
  expiresAt: string;
  createdAt: string;
}

export type QuoteResponse = FincraResponse<QuoteData>;
