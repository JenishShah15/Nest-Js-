import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./Photo";
import { join } from "node:path";


@Entity()
export class Author{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name : String

    @OneToMany(()=>Photo,photo=>photo.author)
   @JoinColumn()
    photos:Photo[]


}