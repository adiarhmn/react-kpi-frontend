/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type DivisionDataPost = {
  division_name: string;
  company_id?: number;
};

export const postCreateDivision = async (divisionDataPost: DivisionDataPost) => {
  const response = await axios.post(`${BaseURL}/division`, divisionDataPost);
  return response.data;
};

export const useCreateDivision = () => {
  return useMutation({
    mutationFn: postCreateDivision,
  });
};
