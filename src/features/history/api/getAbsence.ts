import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAbsence() {
  const res = await axios.get(`${BaseURL}/request`);
  return res.data.data;
}

export const useGetAbsence = () => {
  return useQuery({ queryKey: ['division'], queryFn: () => getAbsence() });
};
