import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSchedule(employee_id: number, date?: string) {
  if (date) {
    const res = await axios.get(`${BaseURL}/schedule?employee=` + employee_id + `&date=` + date);
    console.log('Data Request', employee_id, date);
    console.log('Data Response', res.data.data);
    return res.data.data;
  } else {
    const res = await axios.get(`${BaseURL}/schedule?employee=` + employee_id);
    return res.data.data;
  }
}

export async function getScheduleMonthly(
  employee_id: number | null | undefined,
  month: number,
  year: number
) {
  console.log(month, year);
  const res = await axios.get(
    `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}`
  );
  console.log('Data respon ini bang :', res.data.data);
  return res.data.data;
}

export async function getScheduleDaily(employee_id: number | null, date: string) {
  const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}&date=${date}`);
  console.log('schedule daily : ', res.data.data);
  return res.data.data;
}

export async function getScheduleByStatus(employee_id: number | null, status: string) {
  const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}&status=${status}`);
  console.log('schedule daily : ', res.data.data);
  return res.data.data;
}

export const useGetSchedule = (employee_id: number, date?: string) => {
  return useQuery({
    queryKey: ['schedule', employee_id, date],
    queryFn: () => getSchedule(employee_id, date),
  });
};

export const useGetScheduleMonthly = (
  employee_id: number | null | undefined,
  month: number,
  year: number
) => {
  return useQuery({
    queryKey: ['schedule', employee_id, month, year],
    queryFn: () => getScheduleMonthly(employee_id, month, year),
  });
};

export const useGetScheduleDaily = (employee_id: number | null, date: string) => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => getScheduleDaily(employee_id, date),
  });
};
