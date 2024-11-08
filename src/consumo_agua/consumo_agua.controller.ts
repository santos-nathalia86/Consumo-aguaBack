import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';

@Controller('consumo-agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  @Post()
  async create(@Body('userId') userId: string, @Body('amount') amount: number, @Body('date') date: string) {
    return this.consumoAguaService.create(userId, amount, new Date(date));
  }

  @Get('historico')
  async getHistory(
    @Query('userId') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.consumoAguaService.getHistory(userId, startDate, endDate);
  }

  @Get('alertas')
  async getAlert(@Query('userId') userId: string) {
    return this.consumoAguaService.getConsumptionAlert(userId);
  }
}
