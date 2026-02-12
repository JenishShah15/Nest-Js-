import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BUser } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(BUser) private userRepository: Repository<BUser>,
  ) {}
  changename() {
    return 'name changed';
  }
}
