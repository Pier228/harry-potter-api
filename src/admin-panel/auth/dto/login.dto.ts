import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
