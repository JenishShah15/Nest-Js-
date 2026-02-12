import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @Column({ length: 40 })
  password!: string;
}
