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
  const id_company = localStorage.getItem('id_company');
  const role = localStorage.getItem('role');
  const Company = JSON.parse(localStorage.getItem('COMPANY_DATA') || '{}');
  if (id_company != null && Company) {
    res.data.creds = {
      ...res.data.creds,
      company_id: parseInt(id_company),
      is_freelanced: Company?.is_freelanced || 0,
    };
  }

  if (role != null) {
    res.data.creds = {
      ...res.data.creds,
      role: role,
    };
  }
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
