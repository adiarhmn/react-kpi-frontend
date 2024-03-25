export type Creds = {
  id: string | number;
  username: string;
  name: string;
  role: 'owner' | 'superadmin' | 'employee';
};

export type User = {
  id: number;
  name: string;
  username: string;
  role: 'superadmin' | 'owner' | 'employee';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};
