import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export async function getEduBackground() {
  const res = await axios.get(`${BaseURL}/employee_education`);
  return res.data;
  console.log(res.data);
}
