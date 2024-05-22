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
  status: boolean;
  user_id: number;
  division_id: number;
};

const createEmployee = async (employee: EmployeePostType) => {
  const res = await axios.post(`${BaseURL}/employee`, employee);
  return res.data;
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,
    onMutate: async (employee: EmployeePostType) => {
      console.log(employee);
    },
  });
};
