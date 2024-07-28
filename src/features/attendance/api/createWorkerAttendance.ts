import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type WorkerAttendanceDataPost = {
  employee_input_id?: number |  null;
  worker: any;
};

export const postCreateWorkerAttendance = async (attendanceDataPost: WorkerAttendanceDataPost) => {
  console.log('Data yang dikirim : ', attendanceDataPost);
  const response = await axios.post(`${BaseURL}/worker-attendance`, attendanceDataPost);
  return response.data;
};

export const useCreateWorkerAttendance = () => {
  return useMutation({
    mutationFn: postCreateWorkerAttendance,
    onMutate: async (attendanceDataPost: WorkerAttendanceDataPost) => {
      console.log(attendanceDataPost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
