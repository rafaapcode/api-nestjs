import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Body, Delete, Put } from '@nestjs/common/decorators';
import { data, ReportType } from './data';
import { randomUUID } from 'node:crypto';

@Controller('report/:type')
export class AppController {
  // constructor() {}

  @Get()
  getAllIncomeReports(@Param('type') type: string) {
    return data.report.filter((report) => report.type === type);
  }

  @Get(':id')
  getIncomeReportById(@Param('id') id: string, @Param('type') type: string) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report)
      throw new HttpException(
        `You haven't a ${type} with this id : ${id}`,
        HttpStatus.NOT_FOUND,
      );

    return report;
  }

  @Post()
  createIncomeReport(
    @Body() { source, amount }: any,
    @Param('type') type: string,
  ) {
    const typeReport =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
    const newReport = {
      id: randomUUID(),
      source,
      amount,
      type: typeReport,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.report.push(newReport);

    return newReport;
  }

  @Put(':id')
  updateIncomeReport(@Param('id') id: string, @Param('type') type: string) {
    return [id, type];
  }

  @Delete(':id')
  deleteIncomeReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { source, amount }: any,
  ) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    return [id, type];
  }
}
