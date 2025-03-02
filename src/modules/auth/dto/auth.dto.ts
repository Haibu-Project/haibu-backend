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

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  surnames!: string;

  @IsOptional()
  @IsString()
  image?: string;
  
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email!: string;
}

