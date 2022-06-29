export class EmailAlreadyExistsError extends Error {
  static readonly message = 'Email already exists';
  readonly code = 'EMAIL.ALREADY_EXISTS';

  constructor() {
    super(EmailAlreadyExistsError.message);
  }
}
