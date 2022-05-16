export interface ICreateCommentDto {
  postId: number;
  userId: number;
  description: string;
}

export interface IEditCommentDto {
  commentId: number;
  userId: number;
  description?: string;
}
