import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getActivityDetail(attendance_id: number | undefined | null, date: string) {
  const res = await axios.get(`${BaseURL}/activity-detail?employee=${attendance_id}&date=${date}`);
  return res.data.data;
}

export async function getActivityAlias(company_id?: number) {
  const res = await axios.get(`${BaseURL}/activity-alias?company=${company_id}`);
  return res.data.data;
}

export const useGetActivityDetail = (attendance_id: number | undefined | null, date: string) => {
  return useQuery({
    queryKey: ['activity', attendance_id],
    queryFn: () => getActivityDetail(attendance_id, date),
  });
};

export const useGetActivityAlias = (company_id?: number) => {
  return useQuery({
    queryKey: ['activity_alias', company_id],
    queryFn: () => getActivityAlias(company_id),
  });
};
