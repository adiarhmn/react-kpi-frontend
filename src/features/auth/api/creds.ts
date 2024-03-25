import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

import { Creds } from '../types';

export async function getCreds() {
  const res = await axios.get<Creds>('/auth/me');

  return res.data;
}

export async function loadCreds() {
  if (!storage.getToken()) return null;

  const data = await getCreds();
  return data;
}

export function useCreds() {
  return useQuery({
    queryKey: ['creds'],
    queryFn: loadCreds,
    throwOnError: () => {
      storage.clear();
      return false;
    },
  });
}
