import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSchedule(employee_id: number, date?: string) {
  if (date) {
    const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}&date=${date}`, {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    });
    return res.data.data;
  } else {
    const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}`, {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    });
    return res.data.data;
  }
}

export async function getScheduleByStatus(employee_id: number | null, status: string) {
  const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}&status=${status}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetSchedule = (employee_id: number, date?: string) => {
  return useQuery({
    queryKey: ['schedule', employee_id, date],
    queryFn: () => getSchedule(employee_id, date),
  });
};

export async function getScheduleMonthly(
  employee_id: number | null | undefined | string,
  month: number | string,
  year: number | string,
  shift: string | null,
  status: string | null
) {
  if (shift == null && status == null) {
    const res = await axios.get(
      `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      }
    );
    return res.data.data;
  }

  if (shift != null && status == null) {
    const res = await axios.get(
      `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}$shift=${shift}`,
      {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      }
    );

    return res.data.data;
  }

  if (shift == null && status != null) {
    const res = await axios.get(
      `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      }
    );

    return res.data.data;
  }

  if (shift != null && status != null) {
    const res = await axios.get(
      `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}&shift=${shift}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`,
        },
      }
    );

    return res.data.data;
  }
}

export const useGetScheduleMonthly = (
  employee_id: number | null | undefined | string,
  month: number | string,
  year: number | string,
  shift: string | null,
  status: string | null
) => {
  return useQuery({
    queryKey: ['schedule', employee_id, month, year, shift, status],
    queryFn: () => getScheduleMonthly(employee_id, month, year, shift, status),
  });
};

export async function getScheduleDaily(employee_id?: number | null, date?: string) {
  const res = await axios.get(`${BaseURL}/schedule?employee=${employee_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetScheduleDaily = (employee_id?: number | null, date?: string) => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => getScheduleDaily(employee_id, date),
  });
};

export async function getScheduleAttendance(
  employee_id: number | undefined,
  month: string | number,
  year: string | number,
  status: string
) {
  const res = await axios.get(
    `${BaseURL}/schedule?employee=${employee_id}&month=${month}&year=${year}&attendance-status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetScheduleAttendance = (
  employee_id: number | undefined,
  month: string | number,
  year: string | number,
  status: string
) => {
  return useQuery({
    queryKey: ['schedule', employee_id, month, year, status],
    queryFn: () => getScheduleAttendance(employee_id, month, year, status),
  });
};

export async function getScheduleDailyByDivision(
  division_id?: number | null,
  date?: string | null
) {
  const res = await axios.get(`${BaseURL}/schedule?division=${division_id}&date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetScheduleDailyByDivision = (
  division_id?: number | null,
  date?: string | null
) => {
  return useQuery({
    queryKey: ['schedule', division_id, date],
    queryFn: () => getScheduleDailyByDivision(division_id, date),
  });
};
