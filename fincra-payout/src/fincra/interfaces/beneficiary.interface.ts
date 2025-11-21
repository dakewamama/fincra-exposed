import { FincraResponse } from './business.interface';

export interface BeneficiaryData {
  id: string;
  business: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  accountHolderName: string;
  accountNumber: string;
  country: string;
  currency: string;
  paymentDestination: string;
  bankCode?: string;
  createdAt: string;
  updatedAt: string;
}

export type BeneficiaryResponse = FincraResponse<BeneficiaryData>;

export interface BeneficiaryListResponse {
  status: boolean;
  message: string;
  data: BeneficiaryData[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}
