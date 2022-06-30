export interface IPageInfo<T> {
  items: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
