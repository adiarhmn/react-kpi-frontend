export type Creds = {
  id: number | null;
  is_freelanced: number;
  username: string;
  name: string;
  role: string | 'admin' | 'superadmin' | 'employee' | 'supervisor';
  employee_id: number;
  company_id: number;
  is_freelanced: number | null;
};

export type User = {
  id: number;
  name: string;
  username: string;
  role: 'superadmin' | 'admin' | 'employee' | 'supervisor';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};

export type Companys = {
  company_logo: File | null | string;
  id?: number;
  name: string;
  shift_active: boolean;
  is_freelanced: number;
  companyUrl: string;
};
