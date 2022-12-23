import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { data, ReportType } from './data';

@Injectable()
export class AppService {
  getAllIncomeReports(type: string) {
    const typeReport =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
    if (type !== 'income' && type !== 'expense') {
      throw new HttpException(
        `This ${type} endpoint not supported.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return data.report.filter((report) => report.type === typeReport);
  }

  getIncomeReportById(id: string, type: string) {
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

  createIncomeReport(body: any, type: string) {
    const typeReport =
      type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
    const newReport = {
      id: randomUUID(),
      source: body.source,
      amount: body.amount,
      type: typeReport,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.report.push(newReport);

    return newReport;
  }

  updateIncomeReport(id: string, type: string, body: any) {
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
      amount: body.amount ?? report.amount,
      source: body.source ?? report.source,
      type: report.type,
      created_at: report.created_at,
      updated_at: new Date(),
    };

    return data.report[index];
  }

  deleteIncomeReport(id: string) {
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
