import { FincraResponse } from './business.interface';

export interface Wallet {
  currency: string;
  availableBalance: number;
  ledgerBalance: number;
}

export type WalletResponse = FincraResponse<Wallet[]>;
