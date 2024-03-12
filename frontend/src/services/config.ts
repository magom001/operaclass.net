export const host = "http://127.0.0.1:1337";
export const token = process.env.API_TOKEN;

export interface MetaData {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface Response<T> {
  data: T[];
  meta: MetaData;
}
