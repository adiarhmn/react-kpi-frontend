import { Loader } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useGetEmployees } from '@/admin_features/employees/api';
import { useAuth } from '@/features/auth';

import { EmployeeCard } from './EmployeeCard';

export const AllEmployeeCard: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  // Get Data User
  const { data, isLoading } = useGetEmployees(creds?.company_id);

  if (isLoading) {
    return (
      <div className={`rounded-lg flex px-5 h-20 text-white shadow-md bg-slate-500`}>
        <div className="w-full h-full flex">
          <Loader color="white" size={30} className="m-auto"></Loader>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg flex px-5 h-20 text-white shadow-md bg-slate-500`}>
      <EmployeeCard
        title="Total Karyawan"
        employee_total={data ? data.length : 0}
        IconProps={IconUsers}
        loading={isLoading}
      ></EmployeeCard>
    </div>
  );
};
