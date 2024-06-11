import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ActivitysVariableType } from '../components';

const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const UpdateActivity = async (data: ActivitysVariableType) => {
  console.log(`${BaseURL}/activity-alias/${data?.id}`, data);
  const res = await axios.put(`${BaseURL}/activity-alias/${data?.id}`, data);
  console.log('res:', res);
  return res.data;
};

export const useUpdateActivity = () => {
  return useMutation({
    mutationFn: UpdateActivity,
  });
};
