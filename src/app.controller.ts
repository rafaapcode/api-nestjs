import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Body, Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { data, ReportType } from './data';
import { randomUUID } from 'node:crypto';

@Controller('report/:type')
export class AppController {
  // constructor() {}

  @Get()
  getAllIncomeReports(@Param('type') type: string) {
    if (type !== 'income' && type !== 'expense') {
      throw new HttpException(
        `This ${type} endpoint not supported.`,
        HttpStatus.NOT_FOUND,
      );
    }
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
  updateIncomeReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { source, amount }: any,
  ) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) {
      throw new HttpException(
        `You haven't a ${type} with this id : ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const index = data.report.findIndex((report) => report.id === report.id);

    data.report[index] = {
      id: report.id,
      amount: amount ?? report.amount,
      source: source ?? report.source,
      type: report.type,
      created_at: report.created_at,
      updated_at: new Date(),
    };

    return data.report[index];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(@Param('id') id: string) {
    const reportToDeleteIndex = data.report.findIndex(
      (report) => report.id === id,
    );

    if (reportToDeleteIndex === -1) {
      throw new HttpException(
        `Report with this id : ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    data.report.splice(reportToDeleteIndex, 1);
  }
}
