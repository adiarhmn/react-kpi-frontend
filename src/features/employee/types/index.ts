import { User } from '@/features/auth';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Employee = {
  id: number;
  name: string;
  phonenumber: string;
  address: string;
  user: User;
} & BaseEntity;

export type EmployeeQuery = {
  keyword?: string;
} & Pagination;

export type Shift = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
} & BaseEntity;

export type ShiftQuery = {
  company?: number;
} & Pagination;

export type Attendance = {
  id: number;
  employee: Employee;
  status: 'present' | 'absent' | 'pending' | 'working';
  checkIn: Date | null;
  checkOut: Date | null;
  createdAt: Date;
};

export type EducationBackground = {
  id: number;
  type: string;
  name: string;
  major: string;
  graduate_from: string;
  entry_year: string;
  graduation_year: string;
  employee_id: number;
};
