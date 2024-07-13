import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function getShift(company_id?: number) {
  const res = await axios.get(`${BaseURL}/shift?company=${company_id}`);
  return res.data;
}

async function getShiftBYID(id: number) {
  const res = await axios.get(`${BaseURL}/shift/${id}`);
  return res.data;
}

export const useGetShift = (company_id?: number) => {
  return useQuery({ queryKey: ['shift'], queryFn: () => getShift(company_id) });
};

export const useGetShiftByID = (id: number) => {
  return useQuery({ queryKey: ['shift', id], queryFn: () => getShiftBYID(id) });
};
