import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register({ login, password, key, email }: CreateUserDTO) {
    try {
      await this.regValidation(key, login);

      const hashedPassword = await this.hashPassword(password);

      const response = await this.prisma.user.create({
        data: {
          login,
          email,
          password: hashedPassword,
        },
      });

      if (!response) {
        throw new BadGatewayException('Cannot create user');
      }

      return { message: 'User successfully created' };
    } catch (error) {
      throw error;
    }
  }

  async login({ login, password, email }: LoginDTO) {
    try {
      await this.logValidation(login, password, email);

      const jwt = await this.jwtService.signAsync({ login, email });

      if (!jwt) {
        throw new BadGatewayException('Cannot create token');
      }

      return { message: 'Successfully login', token: jwt };
    } catch (error) {
      throw error;
    }
  }

  private async logValidation(login: string, password: string, email: string) {
    try {
      const user = await this.isExist(login);

      if (!user) {
        throw new NotFoundException('User with this login not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || email !== user.email) {
        throw new BadRequestException('Incorrect credentials');
      }
    } catch (error) {
      throw error;
    }
  }

  private async regValidation(key: string, login: string) {
    try {
      if (key !== process.env.AUTH_KEY) {
        throw new BadRequestException('Invalid auth key');
      }

      const isExist = await this.isExist(login);

      if (isExist) {
        throw new ConflictException('User with this login is already exists');
      }
    } catch (error) {
      throw error;
    }
  }

  private async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, Number(process.env.HASH_LVL));
    } catch (error) {
      throw error;
    }
  }

  private async isExist(login: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { login } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
