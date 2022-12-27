import {
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Body, Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { ReportType } from 'src/data';
import {
  CreateReportDto,
  UpdateReportDto,
  ReportResponseDto,
} from 'src/dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportservice: ReportService) {}

  @Get()
  getAllIncomeReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    return this.reportservice.getAllIncomeReports(type);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.reportservice.getIncomeReportById(id, type);
  }

  @Post()
  createIncomeReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.reportservice.createIncomeReport({ source, amount }, type);
  }

  @Put(':id')
  updateIncomeReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { source, amount }: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportservice.updateIncomeReport(id, type, { source, amount });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(@Param('id', ParseUUIDPipe) id: string) {
    this.reportservice.deleteIncomeReport(id);
  }
}
