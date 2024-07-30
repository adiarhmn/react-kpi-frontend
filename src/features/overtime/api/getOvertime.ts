import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getOvertime(employee_id?: number, status?: boolean | null | string) {
  const res = await axios.get(`${BaseURL}/overtime?employee=${employee_id}&status=${status}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data;
}

export const useGetOvertime = (employee_id?: number, status?: boolean | null | string) => {
  return useQuery({
    queryKey: ['overtime', employee_id, status],
    queryFn: () => getOvertime(employee_id, status),
  });
};

export async function getOvertimeDaily(employee_id?: number, date?: string) {
  const res = await axios.get(`${BaseURL}/overtime?employee=${employee_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data[0] || {};
}

export const useGetOvertimeDaily = (employee_id?: number, date?: string) => {
  return useQuery({
    queryKey: ['overtime', employee_id, date],
    queryFn: () => getOvertimeDaily(employee_id, date),
  });
};

export async function getOvertimeByDivision(division_id?: number, status?: string | null) {
  if (status == null) {
    const res = await axios.get(`${BaseURL}/overtime?division=${division_id}`, {
      headers: {
        Authorization: `Bearer ${storage.getToken}`,
      },
    });
    return res.data.data;
  } else {
    const res = await axios.get(`${BaseURL}/overtime?division=${division_id}&status=${status}`, {
      headers: {
        Authorization: `Bearer ${storage.getToken}`,
      },
    });
    return res.data.data;
  }
}

export const useGetOvertimeByDivision = (division_id?: number, status?: string | null) => {
  return useQuery({
    queryKey: ['overtime', division_id, status],
    queryFn: () => getOvertimeByDivision(division_id, status),
  });
};
