export type AbsenceType = {
  id: number | null;
  date_start: string;
  date_end: string;
  type: string;
  status?: string;
  created_at: string | null;
  description: string;
  employee_id: number;
};
