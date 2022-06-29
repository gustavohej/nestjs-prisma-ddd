import { IChangeEmail } from '@adapters/interfaces/user/change-email.interface';

export class ChangeEmailInput implements IChangeEmail {
  email: string;
}
