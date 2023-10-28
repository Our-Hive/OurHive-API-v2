import { Injectable } from '@nestjs/common';
import { OnboardingRequestDto } from '../dtos/onboarding.request.dto';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/modules/user/services/user.service';
import { OnboardingResponseDto } from '../dtos/onboarding.response.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { PayloadTokenDto } from '../models/token.model';
import { LoginResponseDto } from '../dtos/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async onboarding(
    onboardingDto: OnboardingRequestDto,
  ): Promise<OnboardingResponseDto> {
    // Encrypt password
    const encryptedPassword = await hash(onboardingDto.password, 10);
    // Replace password with encrypted password
    onboardingDto.password = encryptedPassword;

    const createdUser = await this.userService.create(onboardingDto);

    return {
      role: createdUser.role,
      username: createdUser.username,
      email: createdUser.email,
    };
  }

  generateJWT(user: LoginRequestDto): LoginResponseDto {
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
