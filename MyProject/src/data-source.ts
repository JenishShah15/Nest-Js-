import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoeMetadata"

//It is used to setup the conncection for the connection to the required database

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "jenish_015",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User,Photo,PhotoMetadata],
    migrations: [],
    subscribers: [],
})


// export const newAppDataSource = new DataSource({
//     type : "postgres",
//     host : "localhost",
//     port : 5432

// })
