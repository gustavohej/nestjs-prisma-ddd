import { ID } from 'src/shared/domain/value-objects/id.value-object';
import { CommentText } from '../value-objects/comment-text.value-object';

export interface ICreateCommentProps {
  text: CommentText;
  createdByUserId: ID;
  replyToPostId: ID;
}

export interface ICommentProps extends ICreateCommentProps {
  replyToCommentId?: string;
}
