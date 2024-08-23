import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      
      if (!authHeader) {
        throw new ForbiddenException('No token provided');
      }

      const token = this.jwtService.verify(authHeader);

      return token;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
