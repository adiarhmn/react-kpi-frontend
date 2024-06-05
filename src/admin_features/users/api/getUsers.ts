import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

const getUsers = async (id_company?: number) => {
  const res = await axios.get(`${BaseURL}/user?company=${id_company}`);
  return res.data;
};

export const useGetUsers = (id_company?: number) => {
  return useQuery({ queryKey: ['user'], queryFn: () => getUsers(id_company) });
};

export const useGetUsersById = (id: number) => {
  return useQuery({ queryKey: ['user', id], queryFn: () => getUsers(id) });
};
