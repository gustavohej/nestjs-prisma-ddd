export interface ValueProps<T> {
  value: T;
}

export type ValueObjectProps<T> = ValueProps<T>;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }
}
