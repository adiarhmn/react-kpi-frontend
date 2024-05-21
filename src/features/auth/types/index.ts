export type Creds = {
  id: string | number;
  username: string;
  name: string;
  role: 'admin' | 'superadmin' | 'employee';
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
