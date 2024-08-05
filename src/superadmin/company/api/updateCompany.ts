/* eslint-disable linebreak-style */
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
      formData.append('company_logo', 'Undefined Image');
    }

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

  return {
    error: {
      message: 'Gagal Memperbarui Data',
    },
  };
};

export const useUpdateCompany = () => {
  return useMutation({
    mutationFn: updateCompany,
  });
};
