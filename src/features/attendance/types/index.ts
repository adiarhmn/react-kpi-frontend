import { EmployeeGroupsType, EmployeeType, ShiftType } from '@/admin_features/types';

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
  attendance: AttendanceType[];
  shift: ShiftType;
};

export type AttendanceType = {
  id: number;
  check_in: string;
  check_out: string | null;
  shift_in: string;
  shift_out: string;
  status: string;
  attendance_status: string;
  employee_id: number;
  employee: EmployeeType;
  schedule_id: number;
  schedule: ScheduleType;
};

export type ActivityAliasType = {
  id: number;
  cs1_name: string;
  cs2_name: string;
  cs3_name: string;
  cs4_name: string;
  cs5_name: string;
  cs6_name: string;
  cs7_name: string;
  cs8_name: string;
  cs9_name: string;
  cs10_name: string;
  company_id: number;
};

export type ActivityDetailType = {
  id: number;
  attendance_id: number;
  attendance: AttendanceType;
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

export type GroupType = {
  id: number;
  name: string;
  company_id: number;
  EmployeeGroups: EmployeeType[];
  GroupSessions: SessionGroupType[];
};

export type SessionType = {
  id: number;
  name: string;
  company_id: number;
};

export type SessionGroupType = {
  id: number;
  session_id: number;
  session: SessionType;
  group_id: number;
  group: GroupType;
};

export type WorkerAttendanceType = {
  length: number;
  id: number;
  date: Date | string;
  attendance_status: string;
  detail: string;
  group_name: string;
  session_name: string;
  employee_input_id: number;
  employee_id: number;
  employee: EmployeeType;
  employee_group_id: number;
  employee_group: EmployeeGroupsType;
  group_session_id: number;
  group_session: SessionGroupType;
};
