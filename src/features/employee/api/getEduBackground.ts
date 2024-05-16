import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export async function getEduBackground() {
  try {
    const res = await axios.get(`${BaseURL}/employee_education`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching education background:', error);
    return [];
  }
}
