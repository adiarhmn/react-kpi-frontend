import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { SchedulesType } from '../types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export type DataPasteSchedule = {
  beforeDataSchedule?: SchedulesType;
  afterDataSchedule: SchedulesType;
};

async function pasteSchedule(data: DataPasteSchedule) {
  if (
    data.beforeDataSchedule?.Schedules.length == 0 ||
    data.afterDataSchedule.Schedules.length == 0
  ) {
    return null;
  }

  // Mapping data to backend
  const BodyRequest = data.beforeDataSchedule?.Schedules.map((item, index) => ({
    schedule_id: data.afterDataSchedule.Schedules[index].id,
    status: item.status,
    shift_id: item.shift_id,
    default_place: item.attendance_place,
  }));

  const res = await axios.put(`${BaseURL}/schedule`, BodyRequest);
  return res.data.data;
}

export const usePasteSchedule = () => {
  return useMutation({
    mutationFn: pasteSchedule,
  });
};
