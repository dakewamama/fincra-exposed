import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuoteDto {
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
}
