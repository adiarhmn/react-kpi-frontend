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
};

const CreateSchedule = async (schedule: SchedulePost[]) => {
  const response = await axios.post(`${BaseURL}/employee-schedule`, schedule);
  return response.data;
};

const ValidateSchedule = async (employee_schedule_id: ScheduleValidatePost[]) => {
  const response = await axios.post(`${BaseURL}/schedule`, employee_schedule_id);
  return response.data;
}

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: CreateSchedule,
    onMutate: async (schedule: SchedulePost[]) => {
      console.log(schedule);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};

export const useValidateSchedule = () => {
  return useMutation({
    mutationFn: ValidateSchedule,
    onMutate: async (employee_schedule_id: ScheduleValidatePost[]) => {
      console.log(employee_schedule_id);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
