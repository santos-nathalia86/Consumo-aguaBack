// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://senatonha:15083916@cluster0.y3zjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ConsumoAguaModule,
  ],
})
export class AppModule {}
