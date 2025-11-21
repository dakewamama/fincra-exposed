import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class WalletToWalletDto {
  @IsString()
  @IsNotEmpty()
  business: string;

  @IsString()
  @IsNotEmpty()
  customerReference: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  recipientEmail: string;
}