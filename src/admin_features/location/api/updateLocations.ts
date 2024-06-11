import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { AttendanceLocationsType } from '@/admin_features/types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const updateLocations = async (data: AttendanceLocationsType) => {
  const url = `${BaseURL}/attendance-location/${data.id}`;
  const res = await axios.put(url, data);
  return res.data;
};

export const useUpdateLocations = () => {
  return useMutation({
    mutationFn: updateLocations,
  });
};
