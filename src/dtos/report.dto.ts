import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import {
  IsOptional,
  IsPositive,
} from 'class-validator/types/decorator/decorators';
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
  @Expose({ name: 'createdAt' })
  transformedCreatedAt() {
    return new Intl.DateTimeFormat('en-US').format(this.created_at);
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
