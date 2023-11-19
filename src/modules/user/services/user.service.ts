import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { OnboardingRequestDto } from 'src/modules/auth/dtos/onboarding.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async create(user: OnboardingRequestDto): Promise<User> {
    try {
      const newUser = await this.userRepository.save(user);

      if (!newUser) {
        throw new InternalServerErrorException('User not created');
      }

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async deactivate(id: number): Promise<void> {
    try {
      const user = await this.findById(id);

      user.isActive = false;
      await this.userRepository.softDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
