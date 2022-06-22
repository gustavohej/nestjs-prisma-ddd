import { ValueObject } from '../base-classes/value-object.base-class';

export abstract class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }
}
