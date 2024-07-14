export type Creds = {
  id: number | null;
  username: string;
  name: string;
  role: string | 'admin' | 'superadmin' | 'employee' | 'supervisor';
  employee_id: number;
  company_id: number;
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
  company_logo: File | null;
  id?: number;
  name: string;
  shift_active: boolean;
  companyUrl: string;
};
