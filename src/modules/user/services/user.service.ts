import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { OnboardingRequestDto } from 'src/modules/auth/dtos/onboarding.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: OnboardingRequestDto): Promise<User> {
    try {
      const newUser = await this.userRepository.save(user);

      if (!newUser) {
        throw new InternalServerErrorException('user not created');
      }

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}
