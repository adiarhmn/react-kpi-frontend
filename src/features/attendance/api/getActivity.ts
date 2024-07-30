import { Authorization } from '@/features/auth';
import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getActivityAlias(company_id?: number) {
  const res = await axios.get(`${BaseURL}/activity-alias?company=${company_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data;
}

export const useGetActivityAlias = (company_id?: number) => {
  return useQuery({
    queryKey: ['activity_alias', company_id],
    queryFn: () => getActivityAlias(company_id),
  });
};

export async function getActivityDetail(employee_id: number | undefined | null, date: string) {
  const res = await axios.get(`${BaseURL}/activity-detail?employee=${employee_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data;
}

export const useGetActivityDetail = (employee_id: number | undefined | null, date: string) => {
  return useQuery({
    queryKey: ['activity', employee_id, date],
    queryFn: () => getActivityDetail(employee_id, date),
  });
};

export async function getActivityDetailByDivision(
  division_id: number | undefined | null,
  date: string | Date
) {
  const res = await axios.get(`${BaseURL}/activity-detail?division=${division_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data;
}

export const useGetActivityDetailByDivision = (
  division_id: number | undefined | null,
  date: string | Date
) => {
  return useQuery({
    queryKey: ['activity', division_id, date],
    queryFn: () => getActivityDetailByDivision(division_id, date),
  });
};
