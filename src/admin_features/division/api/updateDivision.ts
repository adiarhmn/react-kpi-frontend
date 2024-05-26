import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { DivisionType } from '@/admin_features/types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const updateDivision = async (data: DivisionType) => {
  const response = await axios.put(`${BaseURL}/division/${data.id}`, data);
  return response.data;
};

export const useUpdateDivision = () => {
  return useMutation({
    mutationFn: updateDivision,
  });
};
