import { ID } from './id.value-object';

export class UUID extends ID {
  static generate(): UUID {
    return new UUID('');
  }

  static create(value: string): UUID {
    return new UUID(value);
  }
}
