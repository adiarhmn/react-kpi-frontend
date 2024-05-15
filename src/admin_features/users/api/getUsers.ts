import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export async function getUsers() {
  const res = await axios.get(`${BaseURL}/user`);
  return res.data;
}
