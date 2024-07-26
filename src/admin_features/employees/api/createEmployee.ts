import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
type EmployeePostType = {
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
  status: boolean | number;
  division_id: number;
  username: string;
  password: string;
  role: string;
  company_id?: number;
};

type UserPostType = {
  username: string;
  password: string;
  role: string;
  status: boolean | number;
  company_id?: number;
};

export async function createUser(user: UserPostType) {
  if (!user.company_id) throw new Error('Company ID is required');

  const res = await axios.post(`${BaseURL}/user`, user);
  return res.data.data;
}

const createEmployee = async (employee: EmployeePostType) => {
  const CreateUser = {
    username: employee.username,
    password: employee.password,
    role: employee.role,
    status: 1,
    company_id: employee.company_id,
  };

  const resultUser = await createUser(CreateUser);

  if (!resultUser) throw new Error('Failed to create user');
  const CreateEmployee = {
    ...employee,
    user_id: resultUser.id,
  };

  const res = await axios.post(`${BaseURL}/employee`, CreateEmployee);
  return res.data;
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,
  });
};
