import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { EditScheduleItemType } from '../types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function putFreeDay(DataSchedule: EditScheduleItemType[]) {
  const res = await axios.put(`${BaseURL}/schedule/`, DataSchedule);
  return res.data;
}

export const useEditFreeDay = () => {
  return useMutation({
    mutationFn: putFreeDay,
  });
};
