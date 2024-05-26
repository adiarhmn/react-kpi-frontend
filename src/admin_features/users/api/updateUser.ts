import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { UserType } from '@/admin_features/types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

async function updateUser(data: UserType) {
  const response = await axios.put(`${BaseURL}/user/${data.id}`, data);
  return response.data;
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
