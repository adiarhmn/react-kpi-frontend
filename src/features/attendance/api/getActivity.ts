import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getActivity(attendance_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/activity?attendance=${attendance_id}`);
  return res.data.data;
}

export const useGetActivity = (attendance_id: number | undefined) => {
  return useQuery({
    queryKey: ['activity', attendance_id],
    queryFn: () => getActivity(attendance_id),
  });
};
