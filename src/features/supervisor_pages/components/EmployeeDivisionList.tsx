/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { EmployeeType } from '@/admin_features/types';
import { AttendanceType, getAttendance, useGetAttendance } from '@/features/attendance';
import { useGetEmployeeByDivision } from '@/features/employee/api/Profile';
import { formatterDate } from '@/features/history';
import { Badge, Divider, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EmployeeDivisionProps = {
  division_id: number | undefined;
};
export const EmployeeDivisionList: React.FC<EmployeeDivisionProps> = ({
  division_id,
}: EmployeeDivisionProps) => {
  const BaseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [employeeDivision, setEmployeeDivision] = useState<EmployeeType[]>([]);
  const { data: DataEmployeeDivision } = useGetEmployeeByDivision(division_id);

  useEffect(() => {
    if (DataEmployeeDivision) {
      setEmployeeDivision(DataEmployeeDivision);
    }
  }, [DataEmployeeDivision]);

  console.log('Data Employee', employeeDivision);

  const [employeeAttendance, setEmployeeAttendance] = useState<
    { employee: EmployeeType; attendance: any }[]
  >([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const allAttendance = await Promise.all(
        employeeDivision.map(async (employee) => {
          try {
            const response = await axios.get(
              `${BaseURL}/attendance?employee=${employee.id}&date=${formatterDate(new Date(), 'yyyy-MM-dd')}`
            );
            return { employee, attendance: response.data.data[0] };
          } catch (error) {
            console.error(`Error fetching attendance for employee ${employee.id}:`, error);
            return { employee, attendance: [] };
          }
        })
      );
      setEmployeeAttendance(allAttendance);
    };

    if (employeeDivision.length > 0) {
      fetchAttendance();
    }
  }, [employeeDivision]);

  console.log('Data employeeAttendance', employeeAttendance);

  return (
    <div className="text-center">
      {employeeAttendance.length > 0 ? (
        employeeAttendance.map((emp, index) => (
          <button
            key={index}
            onClick={() =>
              navigate(`/employee-division/detail`, { state: { employee: emp?.employee } })
            }
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative  px-2 text-slate-700 mt-1"
          >
            <div className="w-full grid grid-cols-12 -mb-2 pt-2 p-4">
              <div className="col-span-2 text-center -ms-3">
                <img className="w-full rounded-lg p-2" src="/images/profile-pic.svg" alt="" />
              </div>
              <div className="col-span-10">
                <div className="my-auto text-right -mt-2 -me-3">
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color={emp?.employee.user.role == 'supervisor' ? 'red' : 'blue'}
                  >
                    {emp?.employee.user.role}
                  </Badge>
                </div>
                <div className="my-auto text-left ms-2">
                  <Text lineClamp={1} size={'sm'} fw={700}>
                    {emp?.employee.name}
                  </Text>
                </div>
                <Divider className="w-full mt-2" />
                <div className="grid grid-cols-12 text-left">
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Masuk :{' '}
                      {emp?.attendance != undefined
                        ? formatterDate(new Date(emp?.attendance.check_in), 'HH:mm')
                        : '--:--'}
                    </Text>
                  </div>
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Keluar :{' '}
                      {emp?.attendance != undefined
                        ? formatterDate(new Date(emp?.attendance.check_out), 'HH:mm')
                        : '--:--'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada data anggota</span>
        </section>
      )}
    </div>
  );
};
