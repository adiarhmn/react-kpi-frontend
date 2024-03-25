import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';

import { Creds } from '../types';

type LoginDTO = {
  data: {
    username: string;
    password: string;
  };
};

type LoginResponse = {
  token: string;
  creds: Creds;
};

export async function login({ data }: LoginDTO) {
  const res = await axios.post<LoginResponse>('/auth/login', data);

  return res.data;
}

type UseLoginOption = {
  config?: MutationConfig<typeof login>;
};

export function useLogin({ config }: UseLoginOption = {}) {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ creds, token }) => {
      queryClient.setQueryData(['creds'], creds);
      storage.setToken(token);
    },
    ...config,
  });
}
