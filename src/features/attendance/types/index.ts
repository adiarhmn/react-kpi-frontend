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
  attendance_place: string;
  attendance_status: string;
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

export type ActivityDetailType = {
  id: number;
  attendance_id: number;
  activity_lon: number;
  activity_lat: number;
  custom1: any;
  custom2: any;
  custom3: any;
  custom4: any;
  custom5: any;
  custom6: any;
  custom7: any;
  custom8: any;
  custom9: any;
  custom10: any;

  [key: string]: any;
};

export type AttendanceLocationType = {
  id: number;
  longitude: string;
  latitude: string;
  company_id: number;
  name: string;
};

export type EmployeeLocationType = {
  id: number;
  employee_id: number;
  employee: EmployeeType;
  attendance_location_id: number;
  attendance_location: AttendanceLocationType;
};
