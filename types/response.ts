export default interface Response<T> {
  data: T;
  meta: Meta;
}

interface Meta {
  path: string;
  per_page: number;
  next_cursor: string | null;
  prev_cursor: string | null;
}
