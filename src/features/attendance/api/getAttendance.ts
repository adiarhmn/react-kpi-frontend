import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAttendance(employee_id: number | undefined, date: string) {
  const res = await axios.get(`${BaseURL}/attendance?employee=${employee_id}&date=${date}`);
  console.log(`${BaseURL}/attendance?employee=${employee_id}&date=${date}`);
  console.log(res.data.data[0]);
  return res.data.data[0] || {};
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

export async function getAttendanceBySchedule(employee_id?: number, schedule_id?: number) {
  const res = await axios.get(
    `${BaseURL}/attendance?employee=${employee_id}&schedule=${schedule_id}`
  );
  return res.data.data;
}

export const useGetAttendanceBySchedule = (employee_id?: number, schedule_id?: number) => {
  return useQuery({
    queryKey: ['attendance', employee_id, schedule_id],
    queryFn: () => getAttendanceBySchedule(employee_id, schedule_id),
  });
};

export async function getAttendanceByDivision(division_id: number | undefined, date: string) {
  const res = await axios.get(`${BaseURL}/attendance?division=${division_id}&date=${date}`);
  console.log(`${BaseURL}/attendance?division=${division_id}&date=${date}`);
  console.log('Respon bang', res.data.data[0]);
  return res.data.data;
}

export const useGetAttendanceByDivision = (division_id: number | undefined, date: string) => {
  return useQuery({
    queryKey: ['attendance', division_id, date],
    queryFn: () => getAttendanceByDivision(division_id, date),
  });
};
