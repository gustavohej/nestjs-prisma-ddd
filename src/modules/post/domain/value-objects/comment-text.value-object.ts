import { ValueObject } from 'src/shared/domain/base-classes/value-object.base-class';

export class CommentText extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  static create(value: string): CommentText {
    return new CommentText(value);
  }
}
