import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getAttendance(date: string, company_id?: number) {
  const res = await axios.get(`${BaseURL}/schedule?&company=${company_id}&date=${date}`);
  return res.data.data;
}

export async function getAttendanceRecap(date: string, company_id?: number) {
  const res = await axios.get(`${BaseURL}/schedule?&company=${company_id}&date=${date}`);

  let Hadir = 0;
  let BelumHadir = 0;
  let Cuti = 0;
  let Sakit = 0;
  let Terlambat = 0;
  let Izin = 0;
  const Overall = res.data.data.length;

  console.log('Data Recap -->', res.data.data);
  res.data.data.forEach((item: any) => {
    if (item.attendance_status == 'Belum Hadir') BelumHadir++;
    if (item.Attendance.length != 0) Hadir++;
    if (item.Attendance.length > 0 && item.Attendance[0].status == 'late') Terlambat++;
    if (item.attendance_status == 'Cuti' || item.attendance_status == 'cuti') Cuti++;
    if (item.attendance_status == 'Sakit' || item.attendance_status == 'sakit') Sakit++;
    if (item.attendance_status == 'Izin' || item.attendance_status == 'izin') Izin++;
  });

  return {
    Hadir,
    BelumHadir,
    Cuti,
    Terlambat,
    Sakit,
    Izin,
    Overall,
  };
}

export const useGetAttendance = (date: string, company_id?: number) => {
  return useQuery({
    queryKey: ['attendance', date, company_id],
    queryFn: () => getAttendance(date, company_id),
  });
};

export const useGetAttendanceRecap = (date: string, company_id?: number) => {
  return useQuery({
    queryKey: ['attendance_recap', date, company_id],
    queryFn: () => getAttendanceRecap(date, company_id),
  });
};
