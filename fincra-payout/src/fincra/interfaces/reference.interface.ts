import { FincraResponse } from './business.interface';

export interface BankData {
  id: string;
  name: string;
  code: string;
  type: 'bank' | 'mobile_money';
  country: string;
  currency: string;
  swiftCode?: string;
  bic?: string;
}

export type BankListResponse = FincraResponse<BankData[]>;

export interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
}

export type CurrencyListResponse = FincraResponse<CurrencyData[]>;

export interface CountryData {
  code: string;
  name: string;
  currency: string;
}

export type CountryListResponse = FincraResponse<CountryData[]>;