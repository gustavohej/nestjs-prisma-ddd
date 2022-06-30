import { IPaginated } from '@shared/adapters/interfaces/paginated.interface';

export interface IFindUsers extends IPaginated {
  email?: string;
}
