import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
export type CreateAttendanceLocationType = {
  name: string;
  latitude: number;
  longitude: number;
  company_id: number;
};
export async function createLocations(data: CreateAttendanceLocationType) {
  const url = `${BaseURL}/attendance-location`;
  const res = await axios.post(url, data);
  return res.data;
}

export const useCreateLocations = () => {
  return useMutation({
    mutationFn: createLocations,
  });
};
