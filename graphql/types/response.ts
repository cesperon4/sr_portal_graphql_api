export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  error?: string;
};

export type Page<T> = {
  data: T;
  cursor: number | null;
  hasNextPage: boolean;
};
