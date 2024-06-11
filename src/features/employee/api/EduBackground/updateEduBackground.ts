/* eslint-disable linebreak-style */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { EducationBackground } from '../../types';

const BaseURL = import.meta.env.VITE_API_URL;

async function updateEducationBackground(data: EducationBackground) {
  console.log('Data yang dikirim :', data);
  const response = await axios.put(`${BaseURL}/employee-education/${data.id}`, data);
  return response.data;
}

export const useUpdateEducationBackground = () => {
  return useMutation({
    mutationFn: updateEducationBackground,
  });
};
