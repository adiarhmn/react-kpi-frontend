/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Companys } from '@/features/auth';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const createCompany = async (data: Companys) => {
  console.log('DATA : ', data);
  const formData = new FormData();
  // Jika file ada, tambahkan ke FormData
  if (data.company_logo !== null) {
    formData.append('company_logo', data.company_logo);
    formData.append('name', data.name);
    formData.append('shift_active', data.shift_active.toString());
    formData.append('companyUrl', data.companyUrl);
  }

  console.log('Data yang dikirim : ', formData);
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  const response = await axios.post(`${BaseURL}/company`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: createCompany,
  });
};
