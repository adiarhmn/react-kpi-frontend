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

export const useGetSchedule = (employee_id: number, date?: string) => {
  return useQuery({ queryKey: ['schedule'], queryFn: () => getSchedule(employee_id, date) });
};
