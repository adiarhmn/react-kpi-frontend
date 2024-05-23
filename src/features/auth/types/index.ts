export type Creds = {
  id: number | null;
  username: string;
  name: string;
  role: 'admin' | 'superadmin' | 'employee';
  employee_id: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  role: 'superadmin' | 'admin' | 'employee';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};
