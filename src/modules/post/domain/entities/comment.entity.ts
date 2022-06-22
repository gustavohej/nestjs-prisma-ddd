import {
  Entity,
  InferProps,
} from 'src/shared/domain/base-classes/entity.base-class';
import { ID } from 'src/shared/domain/value-objects/id.value-object';
import { UUID } from 'src/shared/domain/value-objects/uuid.value-object';
import { CommentText } from '../value-objects/comment-text.value-object';

export interface ICreateCommentProps {
  text: CommentText;
  createdByUserId: ID;
  replyToPostId: ID;
}

export interface ICommentProps extends ICreateCommentProps {
  replyToCommentId?: string;
}

export class Comment extends Entity<ICommentProps> {
  protected _id: ID;

  constructor(create: ICreateCommentProps) {
    super();
  }

  static create(create: InferProps<ICreateCommentProps>): Comment {
    return new Comment({
      text: CommentText.create(create.text),
      createdByUserId: UUID.create(create.createdByUserId),
      replyToPostId: UUID.create(create.replyToPostId),
    });
  }
}
