import { EmployeeType, ShiftType } from '@/admin_features/types';

export type EditScheduleItemType = {
  schedule_id: number;
  status: string;
  shift_id: number;
  checked?: boolean;
  default_place: string;
};

export type ScheduleItemType = {
  id: number;
  date: string;
  status: string;
  shift_id: number;
  shift: ShiftType;
  checked?: boolean;
  attendance_place: string;
};
export type SchedulesType = {
  Schedules: ScheduleItemType[];
  employee: EmployeeType;
  employee_id: number;
  date_start: string;
  date_end: string;
};
