const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type ScheduleDataPost = {
  schedule_name: string;
  division_id: number;
  start_date: string;
  end_date: string;
};
