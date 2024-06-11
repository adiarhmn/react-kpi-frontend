import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getActivitys(company_id?: number) {
  const res = await axios.get(`${BaseURL}/activity-detail?company=${company_id}`);
  return res.data.data;
}

export const useGetActivitys = (company_id?: number) => {
  return useQuery({ queryKey: ['activity'], queryFn: () => getActivitys(company_id) });
};

// Get Activity Alias
export async function getActivityAlias(company_id?: number) {
  const res = await axios.get(`${BaseURL}/activity-alias?company=${company_id}`);
  return res.data.data;
}

export const useGetActivityAlias = (company_id?: number) => {
  return useQuery({ queryKey: ['activity-alias'], queryFn: () => getActivityAlias(company_id) });
};
