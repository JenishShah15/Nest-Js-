import { Module } from "@nestjs/common";
import { AuthModule } from "./Auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BUser } from "./user/user.entity";

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "jenish_015",
      database: "test",
      entities: [BUser],
      synchronize: true,
    }),
  ],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
