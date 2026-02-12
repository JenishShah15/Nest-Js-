import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [DatabaseModule, ItemsModule],
})
export class AppModule {}
