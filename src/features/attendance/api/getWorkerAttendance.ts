import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getWorkerAttendanceByGroup(
  date: Date | string,
  group_id: number | undefined
) {
  const res = await axios.get(`${BaseURL}/worker-attendance?date=${date}&group=${group_id}`);
  return res.data.data;
}

export const useGetWorkerAttendanceByGroup = (
  date: Date | string,
  group_id: number | undefined
) => {
  return useQuery({
    queryKey: ['worker-attendance', date, group_id],
    queryFn: () => getWorkerAttendanceByGroup(date, group_id),
  });
};
