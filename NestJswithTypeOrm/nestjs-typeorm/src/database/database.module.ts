import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Listing } from 'src/items/entities/listing.entity';
import { Comment } from 'src/items/entities/comment.entity';
import { Tag } from 'src/items/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jenish_015',
      database: 'test',
      entities: [Item, Listing, Comment, Tag],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
