import { ID } from '../value-objects/id.value-object';
import { ValueObject } from './value-object.base-class';

export type InferProps<T> = {
  [K in keyof T]: T[K] extends ValueObject<infer X> ? X : T[K];
};

export abstract class Entity<T> {
  protected abstract _id: ID;
  protected readonly props: T;

  get id(): ID {
    return this._id;
  }
}
