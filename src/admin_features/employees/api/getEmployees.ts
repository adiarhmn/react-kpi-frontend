import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getEmployees(company_id?: number) {
  const res = await axios.get(`${BaseURL}/employee?company=${company_id}`);
  console.log(`${BaseURL}/employee?company${company_id}`, res.data);
  return res.data.data;
}

export const useGetEmployees = (company_id?: number) => {
  return useQuery({ queryKey: ['employee'], queryFn: () => getEmployees(company_id) });
};
