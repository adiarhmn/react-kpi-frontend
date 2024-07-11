import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

type FilesDataPost = {
  filename: string;
  file: File | null;
  employee_id: number | undefined;
};

export const postCreateFiles = async (filesDataPost: FilesDataPost) => {
  console.log('Data yang dikirim : ', filesDataPost);

  const formData = new FormData();
  formData.append('filename', filesDataPost.filename);
  if (filesDataPost.employee_id !== undefined) {
    formData.append('employee_id', filesDataPost.employee_id.toString());
  }
  if (filesDataPost.file) {
    formData.append('file', filesDataPost.file);
  }

  const response = await axios.post(`${BaseURL}/employee-files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useCreateFiles = () => {
  return useMutation({
    mutationFn: postCreateFiles,
    onMutate: async (filesDataPost: FilesDataPost) => {},
    onError: (error) => {
      console.log('Error :', error);
    },
  });
};
