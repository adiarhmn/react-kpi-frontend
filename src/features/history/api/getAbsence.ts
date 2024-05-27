import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
import { id } from 'date-fns/locale';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAbsence(id?: number | null) {
  const res = await axios.get(`${BaseURL}/request?employee=${id}`);
  return res.data.data;
}

export async function getAbsenceById(id?: number | null | string) {
  const res = await axios.get(`${BaseURL}/request/${id}`);
  return res.data.data;
}

export async function getAbsenceByType(id?: number | null, type?: string, status?: string) {
  const res = await axios.get(`${BaseURL}/request?employee=${id}&types=${type}&status=${status}`);
  console.log('URL : ', `${BaseURL}/request?employee=${id}&type=${type}&status${status}`);
  console.log('Data Request : ', res.data.data);
  return res.data.data;
}

export const useGetAbsenceById = (id?: number | null | string) => {
  return useQuery({ queryKey: ['absence', id], queryFn: () => getAbsenceById(id) });
};

export const useGetAbsence = (id?: number | null) => {
  return useQuery({ queryKey: ['absence'], queryFn: () => getAbsence(id) });
};

export const useGetAbsenceByType = (id?: number | null, type?: string, status?: string) => {
  return useQuery({
    queryKey: ['absence', id, type, status],
    queryFn: () => getAbsenceByType(id, type, status),
  });
};

// FORMATTER DATE
export function formatterDate(date: any, formatType: string) {
  return format(date, formatType, { locale: id });
}

export function getDaysBetweenDates(date1: any, date2: any): number {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  return differenceInDays(endDate, startDate);
}
