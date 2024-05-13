import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getUsers() {
  const res = await axios.get(`${BaseURL}/user`);
  return res.data;
}
