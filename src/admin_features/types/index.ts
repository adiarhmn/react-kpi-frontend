export type UserType = {
  id: number;
  username: string;
  role: string;
  status: boolean;
};

export type ShiftType = {
    id: number;
    shift_name: string;
    start_time: string;
    end_time: string;
}

export type DivisionType = {
    id: number;
    division_name: string;
}

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
}
