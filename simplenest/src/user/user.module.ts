import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BUser } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BUser])],
})
export class UserModule {}
