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
    name: string;
    phone: string;
    address: string;
    status: boolean;
    user: UserType;
    shift: ShiftType;
    division: DivisionType;
}
