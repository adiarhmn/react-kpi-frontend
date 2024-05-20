import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export async function deleteEduBackground(id: number) {
  try {
    await axios.delete(`${BaseURL}/employee_/${id}`);
    return true;
  } catch (error) {
    console.error('Error delete data education background:', error);
    return [];
  }
}
