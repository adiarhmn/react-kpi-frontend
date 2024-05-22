import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSchedule(employee_id: number, date: string) {
  const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}&date=${date}`);
  console.log('Data req:', `${BaseURL}/schedule?employee=${employee_id}&date=${date}`);
  console.log('Data req:', res.data.data);
  return res.data.data;
}

export const useGetSchedule = (employee_id: number, date: string) => {
  return useQuery({
    queryKey: ['schedule', employee_id, date],
    queryFn: () => getSchedule(employee_id, date),
  });
};

// import axios from 'axios';

// const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

// export async function getSchedule(employee_id: number, date: string) {
//   try {
//     const res = await axios.get(`${BaseURL}/schedule?employee=` + employee_id + `&date=` + date);
//     console.log(res.data.data);
//     return res.data.data;
//   } catch (error) {
//     console.error('Error fetching schedule:', error);
//     return [];
//   }
// }

// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const BaseURL = import.meta.env.VITE_API_URL;

// export async function getSchedule(employee_id: number, date: string) {
//   const res = await axios.get(`${BaseURL}/schedule?employee=` + employee_id + `&date=` + date);
//   console.log('Data Req: ', res.data.data);
//   return res.data.data;
// }

// export const useGetSchedule = ({ employee_id, date }: { employee_id: number; date: string }) => {
//   return useQuery({ queryKey: ['schedule'], queryFn: () => getSchedule(employee_id, date) });
// };
