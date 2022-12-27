import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportservice: ReportService) {}

  calculateSummary() {
    const totalExpenses = this.reportservice
      .getAllIncomeReports(ReportType.EXPENSE)
      .reduce((prev, curr) => prev + curr.amount, 0);
    const totalIncome = this.reportservice
      .getAllIncomeReports(ReportType.INCOME)
      .reduce((prev, curr) => prev + curr.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
    };
  }
}
