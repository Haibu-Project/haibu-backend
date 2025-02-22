import { IsNotEmpty, IsString, MinLength, IsOptional, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  walletAddress!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  }
  export class ValidateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;
  }
  