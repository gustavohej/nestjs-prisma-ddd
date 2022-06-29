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
    const props: UserProps = {
      ...create,
    };
    const user = new User(props);
    return user;
  }
}
