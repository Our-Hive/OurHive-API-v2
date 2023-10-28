import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  async create() {
    return 'create';
  }
}
