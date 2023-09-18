export interface IData<T> {
  data: T;
}

export interface IPagination {
  current_page: number;
  total_count: number;
  total_pages: number;
}

export interface IPaginatedData<T> extends IData<T> {
  pagination: IPagination;
}
