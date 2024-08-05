/* eslint-disable linebreak-style */
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Companys } from '@/features/auth';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const updateCompany = async (data: Companys) => {
  const formData = new FormData();
  // Jika file ada, tambahkan ke FormData
  if (data.id) {
    if (data.company_logo !== null) {
      formData.append('company_logo', data.company_logo);
    } else {
      // mengirim data kosong agar tidak terjadi error
      formData.append('company_logo', '');
    }

    formData.append('id', data.id.toString());
    formData.append('name', data.name);
    formData.append('is_freelanced', data.is_freelanced.toString());
    formData.append('shift_active', data.shift_active.toString());
    formData.append('companyUrl', data.companyUrl);
    formData.append('id', data.id.toString());

    const response = await axios.put(`${BaseURL}/company/${data.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }

  return Promise.reject(new Error('Logo perusahaan tidak boleh kosong'));
};

export const useUpdateCompany = () => {
  return useMutation({
    mutationFn: updateCompany,
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });
};
