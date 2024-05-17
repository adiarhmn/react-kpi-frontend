import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export async function deleteUser(id: number) {
  const res = await axios.delete(`${BaseURL}/user/${id}`);
  return res.data;
}
