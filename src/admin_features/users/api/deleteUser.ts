/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

async function deleteUser(id: number) {
  const response = await axios.put(`${BaseURL}/user/${id}`, {
    status: false,
  });
  return response.data;
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
