// src/consumo_agua/consumo_agua.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  constructor(
    @InjectModel(ConsumoAgua.name) private consumoAguaModel: Model<ConsumoAgua>,
  ) {}

  async create(userId: string, amount: number, date: Date): Promise<ConsumoAgua> {
    const newRecord = new this.consumoAguaModel({ userId, amount, date });
    return newRecord.save();
  }

  async getHistory(userId: string, startDate?: string, endDate?: string): Promise<ConsumoAgua[]> {
    const query = { userId };
    if (startDate) query['date'] = { $gte: new Date(startDate) };
    if (endDate) query['date'] = { ...query['date'], $lte: new Date(endDate) };

    return this.consumoAguaModel.find(query).exec();
  }

  async getConsumptionAlert(userId: string): Promise<string> {
    const records = await this.getHistory(userId);

    if (records.length < 2) {
      throw new NotFoundException('Dados insuficientes para calcular alerta');
    }

    const [lastMonth, currentMonth] = records.slice(-2);

    if (currentMonth.amount > lastMonth.amount) {
      return 'Alert: O consumo é maior este mês comparado ao mês passado';
    }

    return 'O consumo está dentro dos limites esperados.';
  }
}
