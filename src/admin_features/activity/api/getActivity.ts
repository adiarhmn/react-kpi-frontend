import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getActivitys(company_id?: number, date?: string) {
  let url = `${BaseURL}/activity-detail?company=${company_id}`;
  if (date) url += `&date=${date}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetActivitys = (company_id?: number, date?: string) => {
  return useQuery({
    queryKey: ['activity', company_id, date],
    queryFn: () => getActivitys(company_id, date),
  });
};

// Get Activity Alias
export async function getActivityAlias(company_id?: number) {
  const res = await axios.get(`${BaseURL}/activity-alias?company=${company_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetActivityAlias = (company_id?: number) => {
  return useQuery({
    queryKey: ['activity-alias', company_id],
    queryFn: () => getActivityAlias(company_id),
  });
};

// ===================== Get Activity Detail By EMployee ID =====================

export const getActivityByEmployeeID = async (employee_id: number, date: string) => {
  const res = await axios.get(`${BaseURL}/activity-detail?employee=${employee_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
};

export const useGetActivityByEmployeeID = (employee_id: number, date: string) => {
  return useQuery({
    queryKey: ['activity-employee', employee_id, date],
    queryFn: () => getActivityByEmployeeID(employee_id, date),
  });
};
