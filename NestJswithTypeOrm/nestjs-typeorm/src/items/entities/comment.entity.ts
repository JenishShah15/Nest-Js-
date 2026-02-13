import { AbstractEntity } from 'src/database/database.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments)
  @JoinColumn()
  item: Item;
}
