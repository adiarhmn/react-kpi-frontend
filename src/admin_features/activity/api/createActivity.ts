import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ActivitysVariableType } from '../components';

const BaseURL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const createActivity = async (data: ActivitysVariableType) => {
  console.log('data:', data);
  const res = await axios.post(`${BaseURL}/activity-alias`, data);
  return res.data;
};

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: createActivity,
  });
};
