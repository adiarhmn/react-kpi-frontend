import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAttendance(employee_id: number | undefined, date: string) {
  const res = await axios.get(`${BaseURL}/attendance?employee=${employee_id}&date=${date}`);
  return res.data.data[0];
}

export const useGetAttendance = (employee_id: number | undefined, date: string) => {
  return useQuery({
    queryKey: ['attendance', employee_id, date],
    queryFn: () => getAttendance(employee_id, date),
  });
};

export async function getAttendanceMonthly(
  employee_id: number | undefined,
  month: string,
  year: string
) {
  const res = await axios.get(
    `${BaseURL}/attendance?employee=${employee_id}&month=${month}&year=${year}`
  );
  return res.data.data;
}

export const useGetAttendanceMonthly = (
  employee_id: number | undefined,
  month: string,
  year: string
) => {
  return useQuery({
    queryKey: ['attendance', employee_id, month, year],
    queryFn: () => getAttendanceMonthly(employee_id, month, year),
  });
};
