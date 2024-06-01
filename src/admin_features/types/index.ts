export type UserType = {
  id: number;
  username: string;
  role: string;
  status: boolean;
  password: string;
};

export type ShiftType = {
  id: number;
  shift_name: string;
  start_time: string;
  end_time: string;
  shift_code: string;
};

export type DivisionType = {
  id: number;
  division_name: string;
};

export type EmployeeType = {
  id: number;
  nip: string;
  nik: string;
  no_bpjs: string;
  name: string;
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
  status: boolean;
  user_id: number;
  division_id: number;
  user: UserType;
  division: DivisionType;
};

export type AttendanceType = {
  id: number;
  check_in: string;
  check_out: string;
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
