/* eslint-disable linebreak-style */
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Companys } from '@/features/auth';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const createCompany = async (data: Companys) => {
  const formData = new FormData();
  // Jika file ada, tambahkan ke FormData
  if (data.company_logo !== null) {
    formData.append('company_logo', data.company_logo);
    formData.append('name', data.name);
    formData.append('is_freelanced', data.is_freelanced.toString());
    formData.append('shift_active', data.shift_active.toString());
    formData.append('companyUrl', data.companyUrl);
    const response = await axios.post(`${BaseURL}/company`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }

  return Promise.reject(new Error('Logo perusahaan tidak boleh kosong'));
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: createCompany,
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });
};
