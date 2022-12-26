import { AppService } from './app.service';
import {
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { Body, Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { ReportType } from '../src/data';
import {
  CreateReportDto,
  UpdateReportDto,
  ReportResponseDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appservice: AppService) {}

  @Get()
  getAllIncomeReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    return this.appservice.getAllIncomeReports(type);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.appservice.getIncomeReportById(id, type);
  }

  @Post()
  createIncomeReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    return this.appservice.createIncomeReport({ source, amount }, type);
  }

  @Put(':id')
  updateIncomeReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { source, amount }: UpdateReportDto,
  ): ReportResponseDto {
    return this.appservice.updateIncomeReport(id, type, { source, amount });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(@Param('id', ParseUUIDPipe) id: string) {
    this.appservice.deleteIncomeReport(id);
  }
}
