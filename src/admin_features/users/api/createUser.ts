import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type UserPostType = {
  username: string;
  password: string;
  role: string;
  status: boolean;
  company_id?: number;
};

export async function createUser(user: UserPostType) {
  const res = await axios.post(`${BaseURL}/user`, user);
  return res.data;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
