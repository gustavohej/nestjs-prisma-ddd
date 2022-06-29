import { EmailIsInvalidError } from '@modules/user/errors/user.errors';

export interface CreateUserProps {
  email: string;
}

export interface UserProps extends CreateUserProps {}

export class User {
  readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  static create(create: CreateUserProps): User {
    if (!create.email) {
      throw new EmailIsInvalidError();
    }
    const props: UserProps = {
      ...create,
    };
    const user = new User(props);
    return user;
  }

  changeEmail(email: string): void {
    this.props.email = email;
  }
}
