import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAbsence(id?: number | null) {
  const res = await axios.get(`${BaseURL}/request?employee=${id}`);
  return res.data.data;
}

export const useGetAbsence = (id?: number | null) => {
  return useQuery({ queryKey: ['division'], queryFn: () => getAbsence(id) });
};
