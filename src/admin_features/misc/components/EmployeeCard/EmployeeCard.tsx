import { Icon } from '@tabler/icons-react';

interface EmployeeCardProps {
  employee_total: number;
  IconProps: Icon;
  title: string;
  color?: string;
  loading: boolean;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee_total, IconProps, title }) => {
  return (
    <div className="my-auto flex-grow">
      <div className="text-sm mb-1">{title}</div>
      <div className="flex justify-between">
        <IconProps size={25} className="" />
        <div className="text-xl font-black">{employee_total}</div>
      </div>
    </div>
  );
};
