import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin-panel/auth')
@ApiTags('Admin Panel - Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reg')
  @ApiOperation({ summary: 'Admin registration' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, description: 'Admin has been successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 502, description: 'Cannot register admin.' })
  async registration(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @Post('log')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 201, description: 'Successfully login.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 502, description: 'Cannot login.' })
  @ApiResponse({ status: 404, description: 'Admin with this credentials not found.' })
  async login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
}
