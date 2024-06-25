import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
import { id } from 'date-fns/locale';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAbsenceById(id?: number | null | string) {
  const res = await axios.get(`${BaseURL}/request/${id}`);
  return res.data.data;
}

export const useGetAbsenceById = (id?: number | null | string) => {
  return useQuery({ queryKey: ['absence', id], queryFn: () => getAbsenceById(id) });
};

export async function getAbsence(id?: number | null) {
  const res = await axios.get(`${BaseURL}/request?employee=${id}`);
  return res.data.data;
}

export const useGetAbsence = (id?: number | null) => {
  return useQuery({ queryKey: ['absence'], queryFn: () => getAbsence(id) });
};

export async function getAbsenceByType(id?: number | null, type?: string, status?: string) {
  const res = await axios.get(`${BaseURL}/request?employee=${id}&types=${type}&status=${status}`);
  console.log('URL : ', `${BaseURL}/request?employee=${id}&type=${type}&status${status}`);
  console.log('Data Request : ', res.data.data);
  return res.data.data;
}

export const useGetAbsenceByType = (id?: number | null, type?: string, status?: string) => {
  return useQuery({
    queryKey: ['absence', id, type, status],
    queryFn: () => getAbsenceByType(id, type, status),
  });
};

export async function getAbsenceByDivision(
  division_id?: number,
  type?: string,
  status?: string | null
) {
  if (status == null) {
    const res = await axios.get(`${BaseURL}/request?division=${division_id}&types=${type}`);
    console.log('URL : ', `${BaseURL}/request?division=${division_id}&types=${type}`);
    return res.data.data;
  } else {
    const res = await axios.get(
      `${BaseURL}/request?division=${division_id}&types=${type}&status=${status}`
    );
    console.log(
      'URL : ',
      `${BaseURL}/request?division=${division_id}&types=${type}&status=${status}`
    );
    return res.data.data;
  }
}

export const useGetAbsenceByDivision = (
  division_id?: number,
  type?: string,
  status?: string | null
) => {
  return useQuery({
    queryKey: ['absence', division_id, type, status],
    queryFn: () => getAbsenceByDivision(division_id, type, status),
  });
};

export async function getAbsenceMonthly(
  employee_id?: number,
  month?: string | number,
  year?: string | number,
  type?: string | null,
  status?: string | null
) {
  if (type != null && status != null) {
    const res = await axios.get(
      `${BaseURL}/request?employee=${employee_id}&month=${month}&year=${year}&types=${type}&status=${status}`
    );
    console.log(
      'URL : ',
      `${BaseURL}/request?employee=${employee_id}&month=${month}&year=${year}&types=${type}&status=${status}`
    );
    return res.data.data;
  } else if (type != null && status == null) {
    const res = await axios.get(
      `${BaseURL}/request?employee=${employee_id}&month=${month}&year=${year}&type=${type}`
    );
    console.log(
      'URL : ',
      `${BaseURL}/request?employee=${employee_id}&month=${month}&year=${year}&type=${type}`
    );
    return res.data.data;
  } else {
    const res = await axios.get(
      `${BaseURL}/request?employee=${employee_id}&month=${month}&year=${year}`
    );
    console.log('URL : ', `${BaseURL}/request?employee=${employee_id}&month=${month}&year=${year}`);
    return res.data.data;
  }
}

export const useGetAbsenceMonthly = (
  employee_id?: number,
  month?: string | number,
  year?: string | number,
  type?: string | null,
  status?: string | null
) => {
  return useQuery({
    queryKey: ['absence', employee_id, month, year, type, status],
    queryFn: () => getAbsenceMonthly(employee_id, month, year, type, status),
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
