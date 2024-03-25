export type GeneralResponse<T = undefined> = {
  message: string;
  result?: T;
};

export type ResultResponse<T> = {
  result: T[];
};

export type ErrorResponse = {
  message: string;
  errors?: { [key: string]: string };
};

export type Metadata = {
  page: number;
  limit: number;
  total: number;
  count: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type Pagination = {
  page?: number;
  limit?: number;
};

export type PaginatedResult<T> = {
  metadata: Metadata;
  result: T[];
};
