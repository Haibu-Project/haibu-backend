import { IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  walletAddress!: string;

  @IsOptional()
  email!: string;

}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  walletAddress!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}

