import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Category = {
  name: string;
  description: string;
  code: string;
  normal: number;
} & BaseEntity;

export type Account = {
  name: string;
  description: string;
  code: string;
  normal: number;
  category: Category;
} & BaseEntity;

export type AccountQuery = {
  keyword?: string;
  category?: number | string;
  company?: number | string;
} & Pagination;
