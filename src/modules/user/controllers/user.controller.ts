import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { ApiBody } from '@nestjs/swagger';
import { DeactiveAccountRequestDto } from 'src/modules/auth/dtos/deactivate.request.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { Request } from 'express';
import { PayloadTokenDto } from 'src/modules/auth/models/token.model';

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @Get()
  getById(@Req() req: Request) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.userService.findById(loggedUser.sub);
  }

  @ApiOperation({ summary: 'Deactivate user' })
  @ApiResponse({ status: 200, description: 'User deactivated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post('deactivate')
  @ApiHeader({ name: 'Authorization', description: 'Auth token' })
  @ApiBody({ type: DeactiveAccountRequestDto })
  deactivate(@Req() req: Request, @Body() user: DeactiveAccountRequestDto) {
    const loggedUser = req.user as PayloadTokenDto;
    return this.userService.deactivate(loggedUser.sub, user);
  }
}
