import { EmployeeType, ShiftType } from '@/admin_features/types';

export type EmployeeScheduleType = {
  id: number;
  date_start: string;
  date_end: string;
  employee_id: number;
  employee: EmployeeType;
};

export type ScheduleType = {
  id: number;
  date: string;
  status: string;
  employee_schedule_id: number;
  employee_schedule: EmployeeScheduleType;
  shift_id: number;
  shift: ShiftType;
};

export type AttendanceType = {
  id: number;
  check_in: string;
  check_out: string | null;
  shift_in: string;
  shift_out: string;
  status: string;
  employee_id: number;
  schedule_id: number;
};

export type ActivityType = {
  id: number;
  name: string;
  description: string;
  time: string | Date;
  attendance_id: number;
};
