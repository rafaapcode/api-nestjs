import { AppService } from './app.service';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Body, Delete, HttpCode, Put } from '@nestjs/common/decorators';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appservice: AppService) {}

  @Get()
  getAllIncomeReports(@Param('type') type: string) {
    return this.appservice.getAllIncomeReports(type);
  }

  @Get(':id')
  getIncomeReportById(@Param('id') id: string, @Param('type') type: string) {
    return this.appservice.getIncomeReportById(id, type);
  }

  @Post()
  createIncomeReport(
    @Body() { source, amount }: any,
    @Param('type') type: string,
  ) {
    return this.appservice.createIncomeReport({ source, amount }, type);
  }

  @Put(':id')
  updateIncomeReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { source, amount }: any,
  ) {
    return this.appservice.updateIncomeReport(id, type, { source, amount });
  }

  @HttpCode(204)
  @Delete(':id')
  deleteIncomeReport(@Param('id') id: string) {
    this.appservice.deleteIncomeReport(id);
  }
}
