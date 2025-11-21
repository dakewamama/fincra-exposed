import { IsString, IsNotEmpty, IsNumber, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum PaymentDestination {
  BANK_ACCOUNT = 'bank_account',
  MOBILE_MONEY = 'mobile_money_wallet',
}

export class BeneficiaryDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  bankCode?: string;
}

export class CreatePayoutDto {
  @IsString()
  @IsNotEmpty()
  business: string;

  @IsString()
  @IsNotEmpty()
  sourceCurrency: string;

  @IsString()
  @IsNotEmpty()
  destinationCurrency: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  customerReference: string;

  @ValidateNested()
  @Type(() => BeneficiaryDto)
  beneficiary: BeneficiaryDto;

  @IsEnum(PaymentDestination)
  @IsNotEmpty()
  paymentDestination: PaymentDestination;
}
