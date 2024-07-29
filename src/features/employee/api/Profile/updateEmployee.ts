/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type EmployeDataPost = {
  id: number;
  nip: string;
  nik: string;
  no_bpjs: string;
  name: string;
  email: string;
  sex: string;
  birth_date: any;
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
  profile_pic?: File | null;
};

export const updateEmployee = async (data: EmployeDataPost) => {
  // async function updateEmployee(data: EmployeDataPost) {
  console.log('Data yang dikirim :', data);

  const formData = new FormData();
  formData.append('id', data.id.toString());
  formData.append('nip', data.nip);
  formData.append('nik', data.nik);
  formData.append('no_bpjs', data.no_bpjs);
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('sex', data.sex);
  formData.append('birth_date', data.birth_date);
  formData.append('religion', data.religion);
  formData.append('first_degree', data.first_degree);
  formData.append('last_degree', data.last_degree);
  formData.append('last_education', data.last_education);
  formData.append('address', data.address);
  formData.append('rt', data.rt);
  formData.append('rw', data.rw);
  formData.append('village', data.village);
  formData.append('subdistrict', data.subdistrict);
  formData.append('district', data.district);
  formData.append('province', data.province);
  formData.append('postal_code', data.postal_code);
  formData.append('phone', data.phone);
  formData.append('status', data.status.toString());
  formData.append('user_id', data.user_id.toString());
  formData.append('division_id', data.division_id.toString());

  if (data.profile_pic) {
    formData.append('profile_pic', data.profile_pic);
  }
  console.log('Data yang dikirim sebelum edit', formData);
  const response = await axios.put(`${BaseURL}/employee/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: updateEmployee,
    onMutate: async (data: EmployeDataPost) => {},
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
