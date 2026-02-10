
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhotoMetadata } from "./PhotoeMetadata";

@Entity()
export class Photo{

    @PrimaryGeneratedColumn()
    id : number
    @Column({length : 100})
    name : string
    @Column("text")
    description : string
    @Column()
    filename : string
    @Column()
    views : number
    @Column()
    isPublished : boolean

    @OneToOne(()=>PhotoMetadata,metadata=>metadata.photo)
    metadata : PhotoMetadata
}

