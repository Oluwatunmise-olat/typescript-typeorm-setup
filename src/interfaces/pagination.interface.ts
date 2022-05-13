export interface IPaginationResponse<T> {
  count: number;
  previous: string;
  next: string;
  results: Array<T>;
}
