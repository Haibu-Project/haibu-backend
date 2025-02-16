import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  postId!: string;
}

export class UpdateCommentDto {
  @IsString()
  content?: string;
}
