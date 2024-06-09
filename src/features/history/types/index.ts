export type AbsenceType = {
  id?: number | null | string;
  date_start: string;
  date_end: string;
  type: string;
  status?: string;
  created_at: any;
  description: string;
  employee_id?: number;
};
