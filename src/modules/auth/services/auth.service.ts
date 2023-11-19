import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OnboardingRequestDto } from '../dtos/onboarding.request.dto';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/modules/user/services/user.service';
import { OnboardingResponseDto } from '../dtos/onboarding.response.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadTokenDto } from '../models/token.model';
import { LoginResponseDto } from '../dtos/login.response.dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async onboarding(
    onboardingDto: OnboardingRequestDto,
  ): Promise<OnboardingResponseDto> {
    if (onboardingDto.password !== onboardingDto.passwordConfirmation) {
      throw new UnauthorizedException('Password confirmation does not match');
    }
    // Check if email already exists
    const emailExists = await this.userService.findByEmail(onboardingDto.email);

    if (emailExists) {
      throw new UnauthorizedException('Email already exists');
    }

    // Check if username already exists
    const usernameExists = await this.userService.findByUsername(
      onboardingDto.username,
    );

    if (usernameExists) {
      throw new UnauthorizedException('Username already exists');
    }

    // Encrypt password
    const encryptedPassword = await hash(onboardingDto.password, 10);
    // Replace password with encrypted password
    onboardingDto.password = encryptedPassword;

    const createdUser = await this.userService.create(onboardingDto);

    return {
      role: createdUser.role,
      username: createdUser.username,
      email: createdUser.email,
      access_token: this.generateJWT(createdUser).access_token,
    };
  }

  generateJWT(user: User): LoginResponseDto {
    const payload: PayloadTokenDto = { role: user.role, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    // Compare password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    return user;
  }
}
