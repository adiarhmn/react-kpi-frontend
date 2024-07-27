import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type SchedulePost = {
  date_start: string;
  date_end: string;
  employee_id: number;
};

type ScheduleValidatePost = {
  employee_schedule_id: number;
  default_shift: number;
  default_attendance_place: 'WFO';
};

export const CreateSchedule = async (schedule: SchedulePost[]) => {
  const response = await axios.post(`${BaseURL}/employee-schedule`, schedule);
  return response.data;
};

export const ValidateSchedule = async (employee_schedule_id: ScheduleValidatePost[]) => {
  const response = await axios.post(`${BaseURL}/schedule`, employee_schedule_id);
  return response.data;
};

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: CreateSchedule,
  });
};

export const useValidateSchedule = () => {
  return useMutation({
    mutationFn: ValidateSchedule,
  });
};
