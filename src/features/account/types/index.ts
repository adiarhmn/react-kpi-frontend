import { Company } from '@/features/company';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Category = {
  name: string;
  description: string;
  code: string;
  normal: number;
  company?: Company;
} & BaseEntity;

export type Account = {
  name: string;
  description: string;
  code: string;
  normal: number;
  category: Category;
  company?: Company;
} & BaseEntity;

export type AccountQuery = {
  keyword?: string;
  category?: number | string;
  company?: number | string;
} & Pagination;
