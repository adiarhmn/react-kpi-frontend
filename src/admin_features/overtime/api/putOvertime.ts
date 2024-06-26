import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

type OvertimeUpdatetype = {
  id: number;
  status: string;
};

const UpdateOvertime = async (data: OvertimeUpdatetype) => {
  const response = await axios.put(`${BaseURL}/overtime/approval/${data.id}`, data);
  return response.data;
};

export const useUpdateOvertime = () => {
  return useMutation({
    mutationFn: UpdateOvertime,
  });
};
