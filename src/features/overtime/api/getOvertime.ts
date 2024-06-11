import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getOvertime(employee_id?: number) {
  const res = await axios.get(`${BaseURL}/overtime?employee=${employee_id}`);
  return res.data.data;
}

export const useGetOvertime = (employee_id?: number) => {
  return useQuery({ queryKey: ['overtime', employee_id], queryFn: () => getOvertime(employee_id) });
};

export async function getOvertimeDaily(employee_id?: number, date?: string) {
  const res = await axios.get(`${BaseURL}/overtime?employee=${employee_id}&date=${date}`);
  return res.data.data[0];
}

export const useGetOvertimeDaily = (employee_id?: number, date?: string) => {
  return useQuery({
    queryKey: ['overtime', employee_id, date],
    queryFn: () => getOvertimeDaily(employee_id, date),
  });
};
