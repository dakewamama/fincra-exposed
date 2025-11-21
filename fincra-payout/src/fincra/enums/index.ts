export enum BeneficiaryType {
  INDIVIDUAL = 'individual',
  CORPORATE = 'corporate',
}

export enum PayoutStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentDestination {
  BANK_ACCOUNT = 'bank_account',
  MOBILE_MONEY = 'mobile_money_wallet',
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}
