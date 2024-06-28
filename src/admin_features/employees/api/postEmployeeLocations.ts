/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type EmployeeLocation = {
  employee_id?: number;
  attendance_location_id: number;
};

export const postCreateLocationEmployee = async (data: EmployeeLocation) => {
  const response = await axios.post(`${BaseURL}/employee-location`, data);
  return response.data;
};

export const useCreateLocationEmployee = () => {
  return useMutation({
    mutationFn: postCreateLocationEmployee,
    onMutate: async (data: EmployeeLocation) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
