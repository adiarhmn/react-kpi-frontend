import storage from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSession(group_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/session?group=${group_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data;
}

export const useGetSession = (group_id: number | undefined) => {
  return useQuery({
    queryKey: ['session', group_id],
    queryFn: () => getSession(group_id),
  });
};


export async function getSessionByGroup(group_id: number | undefined) {
  const res = await axios.get(`${BaseURL}/group-session?group=${group_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken}`,
    },
  });
  return res.data.data
}

export const useGetSessionByGroup = (group_id: number | undefined) => {
  return useQuery({
    queryKey: ['group-session', group_id],
    queryFn: () => getSessionByGroup(group_id)
  })
}