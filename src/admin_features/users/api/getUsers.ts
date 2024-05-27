import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

const getUsers = async (id?: number) => {
  const res = await axios.get(`${BaseURL}/user/${id ?? ''}`);
  return res.data;
};

export const useGetUsers = () => {
  return useQuery({ queryKey: ['user'], queryFn: () => getUsers() });
};

export const useGetUsersById = (id: number) => {
  return useQuery({ queryKey: ['user', id], queryFn: () => getUsers(id) });
};
