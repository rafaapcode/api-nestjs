import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import {
  IsOptional,
  IsPositive,
} from 'class-validator/types/decorator/decorators';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  source: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class UpdateReportDto {
  @IsOptional()
  @IsString()
  @Length(3)
  source: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;
}
