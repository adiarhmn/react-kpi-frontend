import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getEmployees(company_id?: number, division_id?: number) {
  const BaseGetURL =
    division_id !== undefined
      ? `${BaseURL}/employee?company=${company_id}&division=${division_id}`
      : `${BaseURL}/employee?company=${company_id}`;

  console.log(`${BaseURL}/employee?company${company_id}`, BaseGetURL);
  const res = await axios.get(BaseGetURL);
  console.log(`${BaseURL}/employee?company${company_id}`, res.data);
  return res.data.data;
}

export const useGetEmployees = (company_id?: number, division_id?: number) => {
  return useQuery({
    queryKey: ['employee', company_id, division_id],
    queryFn: () => getEmployees(company_id, division_id),
  });
};
