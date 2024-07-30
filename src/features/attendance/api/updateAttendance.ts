import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type UpdateAttendancePost = {
  attendance_id?: number;
};

export const postUpdateAttendance = async (UpdateAttendancePost: UpdateAttendancePost) => {
  console.log('Data sebelum response:', UpdateAttendancePost);
  const response = await axios.put(
    `${BaseURL}/attendance/out/${UpdateAttendancePost.attendance_id}`,
    UpdateAttendancePost
  );
  return response;
};

export const useUpdateAttendance = () => {
  return useMutation({
    mutationFn: postUpdateAttendance,
    onMutate: async (UpdateAttendancePost: UpdateAttendancePost) => {
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
