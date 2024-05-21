// import axios from 'axios';

// const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

// export async function getAbsence() {
//   try {
//     const res = await axios.get(`${BaseURL}/request`);
//     console.log(res.data.data);
//     return res.data.data;
//   } catch (error) {
//     console.error('Error fetching data izin:', error);
//     return [];
//   }
// }

import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';
console.log('BaseURL: ', BaseURL);

export async function getAbsence() {
  try {
    const res = await axios.get(`${BaseURL}/request`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Response error:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error('Config error:', error.config);
    return [];
  }
}
