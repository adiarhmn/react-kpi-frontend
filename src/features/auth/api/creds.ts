import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

import { Creds } from '../types';

type AuthMeType = {
  creds: Creds;
  status: string;
};
const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getCreds() {
  const res = await axios.get<AuthMeType>(`${BaseURL}/auth/me`);

  // Cek Local Storage id company
  console.log(localStorage.getItem('id_company'));

  return res.data.creds;
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
      console.log('Error loading creds');
      storage.clear();
      return false;
    },
  });
}
