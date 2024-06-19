import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

const getUsers = async (id_company?: number, id_user?: number) => {
  let url = `${BaseURL}/user`;
  if (id_company) url += `?company=${id_company}`;
  if (id_user) url += `/${id_user}`;

  const res = await axios.get(url);
  return res.data;
};

export const useGetUsers = (id_company?: number) => {
  return useQuery({ queryKey: ['user'], queryFn: () => getUsers(id_company) });
};

export const useGetUsersById = (id: number) => {
  return useQuery({ queryKey: ['user', id], queryFn: () => getUsers(undefined, id) });
};
