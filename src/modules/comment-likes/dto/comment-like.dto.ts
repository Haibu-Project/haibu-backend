import { IsNotEmpty, IsString } from "class-validator";

export class CommentLikeDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  commentId!: string;
}
