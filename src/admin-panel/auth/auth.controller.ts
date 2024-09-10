import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/auth')
@ApiTags('Admin Panel - Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reg')
  async registration(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @Post('log')
  async login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
}
