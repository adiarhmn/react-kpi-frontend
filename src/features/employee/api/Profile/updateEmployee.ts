/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { EmployeeType } from '@/admin_features/types';

const BaseURL = import.meta.env.VITE_API_URL;

type EmployeDataPost = {
  id: number;
  nip: string;
  nik: string;
  no_bpjs: string;
  name: string;
  email: string;
  sex: string;
  birth_date: string;
  religion: string;
  first_degree: string;
  last_degree: string;
  last_education: string;
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

async function updateEmployee(data: EmployeDataPost) {
  console.log('Data yang dikirim :', data);
  const response = await axios.put(`${BaseURL}/employee/${data.id}`, data);
  return response.data;
}

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: updateEmployee,
  });
};
