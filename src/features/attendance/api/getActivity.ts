import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getActivityDetail(employee_id: number | undefined | null, date: string) {
  const res = await axios.get(`${BaseURL}/activity-detail?employee=${employee_id}&date=${date}`);
  console.log(`${BaseURL}/activity-detail?employee=${employee_id}&date=${date}`);
  return res.data.data;
}

export async function getActivityAlias(company_id?: number) {
  const res = await axios.get(`${BaseURL}/activity-alias?company=${company_id}`);
  return res.data.data;
}

export const useGetActivityDetail = (employee_id: number | undefined | null, date: string) => {
  return useQuery({
    queryKey: ['activity', employee_id, date],
    queryFn: () => getActivityDetail(employee_id, date),
  });
};

export const useGetActivityAlias = (company_id?: number) => {
  return useQuery({
    queryKey: ['activity_alias', company_id],
    queryFn: () => getActivityAlias(company_id),
  });
};
