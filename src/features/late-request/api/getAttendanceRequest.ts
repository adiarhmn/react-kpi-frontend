import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAttendanceRequest(employee_id?: number, status?: string | null) {
  if (status == null) {
    const res = await axios.get(`${BaseURL}/attendance-request?employee=${employee_id}`, {
      headers: {
        Authorization: `Bearer ${storage.getToken}`,
      },
    });
    return res.data.data;
  } else {
    const res = await axios.get(
      `${BaseURL}/attendance-request?employee=${employee_id}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${storage.getToken}`,
        },
      }
    );
    return res.data.data;
  }
}

export const useGetAttendanceRequest = (employee_id?: number, status?: string | null) => {
  return useQuery({
    queryKey: ['attendance_request', employee_id, status],
    queryFn: () => getAttendanceRequest(employee_id, status),
  });
};

export async function getAttendanceReqByDivision(division_id?: number, status?: string | null) {
  if (status == null) {
    const res = await axios.get(`${BaseURL}/attendance-request?division=${division_id}`, {
      headers: {
        Authorization: `Bearer ${storage.getToken}`,
      },
    });
    return res.data.data;
  } else {
    const res = await axios.get(
      `${BaseURL}/attendance-request?division=${division_id}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${storage.getToken}`,
        },
      }
    );
    return res.data.data;
  }
}

export const useGetAttendanceReqByDivision = (division_id?: number, status?: string | null) => {
  return useQuery({
    queryKey: ['attendance_request', division_id, status],
    queryFn: () => getAttendanceReqByDivision(division_id, status),
  });
};
