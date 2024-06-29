import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getEmployees(company_id?: number, division_id?: number, sex?: string) {
  let url = `${BaseURL}/employee`;
  if (company_id) url += `?company=${company_id}`;
  if (division_id) url += `&division=${division_id}`;
  if (sex) url += `&sex=${sex}`;

  console.log(url);
  // const BaseGetURL = BaseURLS(company_id, division_id);
  const res = await axios.get(url);
  return res.data.data;
}

export const useGetEmployees = (company_id?: number, division_id?: number, sex?: string) => {
  return useQuery({
    queryKey: ['employee', company_id, division_id, sex],
    queryFn: () => getEmployees(company_id, division_id, sex),
  });
};
