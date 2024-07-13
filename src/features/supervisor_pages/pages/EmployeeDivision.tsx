/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { useGetEmployee } from '@/features/employee/api/Profile';
import { IconCaretDown, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeDivisionList } from '../components';
import { Button, Popover, Text } from '@mantine/core';

export const EmployeeDivision: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-1">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Anggota {employee?.division.division_name} </h2>
          </div>
          {/* <span className="font-semibold">
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button variant="transparent" size="xs">
                  <IconCaretDown />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="xs">
                  This is uncontrolled popover, it is opened when button is clicked
                </Text>
              </Popover.Dropdown>
            </Popover>
          </span> */}
        </div>
      </section>

      <EmployeeDivisionList division_id={employee?.division.id} />
    </main>
  );
};
