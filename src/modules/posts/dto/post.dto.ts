import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  content!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;
}

export class UpdatePostDto {
  @IsString()
  @Length(5, 100)
  title?: string;

  @IsString()
  @Length(10, 500)
  content?: string;
}
