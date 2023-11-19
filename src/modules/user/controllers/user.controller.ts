import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { DeactiveAccountRequestDto } from 'src/modules/auth/dtos/deactivate.request.dto';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  // ...

  @ApiOperation({ summary: 'Deactivate user by ID' })
  @ApiResponse({ status: 200, description: 'User deactivated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post(':id/deactivate')
  @ApiBody({ type: DeactiveAccountRequestDto })
  deactivate(@Param('id') id: number, @Body() user: DeactiveAccountRequestDto) {
    return this.userService.deactivate(id, user);
  }
}
