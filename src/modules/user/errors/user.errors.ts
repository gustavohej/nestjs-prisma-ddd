export class UserNotFoundError extends Error {
  static readonly message = 'User not found';
  readonly code = 'USER.NOT_FOUND';

  constructor() {
    super(UserNotFoundError.message);
  }
}

export class EmailAlreadyExistsError extends Error {
  static readonly message = 'Email already exists';
  readonly code = 'EMAIL.ALREADY_EXISTS';

  constructor() {
    super(EmailAlreadyExistsError.message);
  }
}

export class EmailIsInvalidError extends Error {
  static readonly message = 'Email is invalid';
  readonly code = 'EMAIL.IS_INVALID';

  constructor() {
    super(EmailIsInvalidError.message);
  }
}
