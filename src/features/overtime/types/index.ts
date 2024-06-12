import { AttendanceType } from '@/features/attendance';

export type OvertimeType = {
  id: number | null;
  start_time: Date | string;
  end_time: Date | string;
  attendance_id: number;
  detail: string;
  attendance: AttendanceType;
  status: string;
};
