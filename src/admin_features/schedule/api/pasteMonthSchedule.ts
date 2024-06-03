import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { SchedulesType } from '../types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export type DataPasteScheduleMonth = {
  DataScheduleOld?: SchedulesType[];
  month: number;
  year: number;
  default_shift: number;
  date_start: string;
  date_end: string;
};

export async function pasteDataSchedule(request: DataPasteScheduleMonth) {
  if (!request.DataScheduleOld) {
    return null;
  }
  // Mapping Data Schedule
  const CreateEmployee = request.DataScheduleOld?.map((item: SchedulesType) => {
    return {
      date_start: request.date_start,
      date_end: request.date_end,
      employee_id: item.employee_id,
    };
  });

  const responseCreate = await axios.post(`${BaseURL}/employee-schedule`, CreateEmployee);

  if (responseCreate.data.data.length < 1) {
    return null;
  }

  const dataValidateSchedule = responseCreate.data.data.map((item: any) => ({
    employee_schedule_id: item.id,
    default_shift: request.default_shift,
  }));

  await axios.post(`${BaseURL}/schedule`, dataValidateSchedule);

  const responseGet = await axios.get(
    `${BaseURL}/employee-schedule?month=${request.month}&year=${request.year}`
  );

  const DataScheduleNew = responseGet.data.data;

  console.log('New', DataScheduleNew);
  console.log('Old', request.DataScheduleOld);

  const DataUpdate = DataScheduleNew.map((item: SchedulesType) => {
    const ScheduleOLD = request.DataScheduleOld?.find(
      (data) => data.employee_id == item.employee_id
    );
    return item.Schedules.map((schedule, index) => {
      return {
        schedule_id: schedule.id,
        status: ScheduleOLD?.Schedules[index].status ?? 'on',
        shift_id: ScheduleOLD?.Schedules[index].shift_id ?? request.default_shift,
      };
    });
  }).flat();
  const res = await axios.put(`${BaseURL}/schedule`, DataUpdate);

  return res.data;
}

export const usePasteMonthSchedule = () => {
  return useMutation({
    mutationFn: pasteDataSchedule,
    onError: (error) => {
      console.log('Gagal Insert Data:', error);
    },
  });
};
