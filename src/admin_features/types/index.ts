/* eslint-disable linebreak-style */
export type UserType = {
  id: number;
  username: string;
  role: string;
  status: number | boolean;
  password: string;
  company_id?: number;
};

export type ShiftType = {
  id: number;
  shift_name: string;
  start_time: string;
  is_active: boolean | string;
  end_time: string;
  shift_code: string;
};

export type DivisionType = {
  id: number;
  Employees: EmployeeType[];
  division_name: string;
};

export type EmployeeType = {
  id: number;
  nip: string;
  nik: string;
  no_bpjs: string;
  name: string;
  last_education: string;
  first_degree: string;
  last_degree: string;
  sex: string;
  birth_date: string;
  religion: string;
  address: string;
  rt: string;
  rw: string;
  village: string;
  subdistrict: string;
  district: string;
  province: string;
  postal_code: string;
  phone: string;
  email: string;
  status: boolean;
  user_id: number;
  division_id: number;
  user: UserType;
  division: DivisionType;
  EmployeeLocation: EmployeeLocation[];
};

export type AttendanceType = {
  id: number;
  check_in: string;
  check_out: string;
  attendance_lat: string;
  attendance_lon: string;
  status: string;
  shift_in: string;
  shift_out: string;
  shift_id: number;
  shift: ShiftType;
  employee: EmployeeType;
};

export type ActivitysType = {
  id: number;
  name: string;
  description: string;
  time: string;
  attendance: AttendanceType;
};

export type RequestsType = {
  id: number;
  employee_id: number;
  type: string;
  description: string;
  status: string;
  date_start: string;
  date_end: string;
  created_at: string;
  employee: EmployeeType;
};

export type AttendanceLocationsType = {
  name: string;
  latitude: string;
  longitude: string;
  company_id: number;
  id?: number;
};

export type ScheduleAttendanceType = {
  id: number;
  Attendance: AttendanceType[];
  attendance_place: string;
  attendance_status: string;
  shift: ShiftType;
  date: string;
  status: string;
  employee_schedule: EmployeeScheduleType;
};

type EmployeeScheduleType = {
  id: number;
  employee: EmployeeType;
};

type EmployeeLocation = {
  id: number;
  emplpoyee_id: number;
};

export type AttendanceReqType = {
  id?: number;
  employee_id: number;
  employee: EmployeeType;
  reason: string;
  status: string;
  attendance_request_lon: string;
  attendance_request_lat: string;
};

export type OvertimeType = {
  id: number;
  start_time: string;
  end_time: string;
  detail: string;
  status: string;
  overtime_lon: string;
  overtime_lat: string;
  attendance_id: number;
  attendance: AttendanceType;
};

// Freelance Type Data =================================================================================================

type CompanyType = {
  companyUrl: string;
  company_logo: string;
  id: number;
  is_freelanced: number;
  name: string;
  shift_active: boolean;
};

export type SessionType = {
  id: number;
  name: string;
  company_id: number;
  company: CompanyType;
};

export type WorkersType = {
  id: number;
  name: string;
  nik: string;
  nip: string;
};

/**
 * 
 * 0
: 
EmployeeGroups
: 
(2) [{…}, {…}]
GroupSessions
: 
(2) [{…}, {…}]
company
: 
{id: 0, name: '', company_logo: '', shift_active: false, companyUrl: '', …}
company_id
: 
2
id
: 
1
name
: 
"Kelompok GG"
[[Prototype]]
: 
Object
 * 
 * **/

export type EmployeeGroupsType = {
  id: number;
  employee_id: number;
  employee: EmployeeType;
  group_id: number;
};

export type GroupSessionsType = {
  id: number;
  details: string;
  session_id: number;
  session: SessionType;
};

export type GroupType = {
  id: number;
  name: string;
  company_id: number;
  company: CompanyType;
  details: string;
  GroupSessions: GroupSessionsType[];
  EmployeeGroups: EmployeeGroupsType[];
};

export type AttendanceWorkerType = {
  attendance_status: string;
  date: string;
  detail: string;
  employee_group_id: number;
  employee: EmployeeType;
  employee_id: number;
  employee_input_id: number;
  group_name: string;
  group_session_id: number;
  id: number;
  session_name: string;
};
