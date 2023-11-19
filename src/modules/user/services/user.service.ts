import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { OnboardingRequestDto } from 'src/modules/auth/dtos/onboarding.request.dto';
import { DeactiveAccountRequestDto } from 'src/modules/auth/dtos/deactivate.request.dto';
import { compare } from 'bcrypt';

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
        return null;
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
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
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
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
      throw error;
    }
  }

  async deactivate(id: number, user: DeactiveAccountRequestDto): Promise<void> {
    try {
      const existingUser = await this.findById(id);

      if (user.password !== user.passwordConfirmation) {
        throw new UnauthorizedException(
          'Password and password confirmation do not match',
        );
      }

      // Compare password
      const passwordMatch = await compare(user.password, existingUser.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Password does not match');
      }

      //Update user status
      existingUser.isActive = false;
      await this.userRepository.save(existingUser);

      await this.userRepository.softDelete(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
