import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateOvertimePost = {
  overtime_id: number;
};

export const postUpdateOvertime = async (UpdateOvertimePost: UpdateOvertimePost) => {
  console.log('Data sebelum response:', UpdateOvertimePost);
  const response = await axios.put(
    `${BaseURL}/overtime/out/${UpdateOvertimePost.overtime_id}`,
    UpdateOvertimePost
  );
  console.log('response :', response);
  return response;
};

export const useUpdateOvertime = () => {
  return useMutation({
    mutationFn: postUpdateOvertime,
    onMutate: async (UpdateOvertimePost: UpdateOvertimePost) => {
      console.log(UpdateOvertimePost);
    },
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
