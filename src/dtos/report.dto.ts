import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ReportType } from 'src/data';

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

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
