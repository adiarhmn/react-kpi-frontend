/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Companys } from '@/features/auth';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const createCompany = async (data: Companys) => {
  const response = await axios.post(`${BaseURL}/company`, data);
  return response.data;
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: createCompany,
  });
};
