
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhotoMetadata } from "./PhotoeMetadata";
import { Author } from "./Author";

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
    @Column({nullable : true})
    views : number
    @Column()
    isPublished : boolean

    @OneToOne(()=>PhotoMetadata,metadata=>metadata.photo,{
        cascade : true,
    })
    metadata : PhotoMetadata

    @ManyToOne(()=>Author,author=>author.photos,{cascade:true})
    author:Author
}

