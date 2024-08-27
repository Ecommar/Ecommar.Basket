// app.module.ts
import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [BasketModule], // Importing BasketModule
})
export class AppModule { }
