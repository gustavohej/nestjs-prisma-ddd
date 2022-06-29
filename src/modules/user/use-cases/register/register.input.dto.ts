import { IRegister } from '@adapters/interfaces/user/register.interface';

export class RegisterInput implements IRegister {
  email: string;
}
