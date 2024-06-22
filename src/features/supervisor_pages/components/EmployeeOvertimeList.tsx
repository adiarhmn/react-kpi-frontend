/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { useGetEmployee } from '@/features/employee/api/Profile';
import {
  AbsenceType,
  formatterDate,
  getDaysBetweenDates,
  useGetAbsenceByDivision,
} from '@/features/history';
import { useGetOvertime } from '@/features/overtime/api/getOvertime';
import { OvertimeType } from '@/features/overtime/types';
import { Badge, Divider, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EmployeeOvertimeProps = {
  status: string;
};

export const EmployeeOvertimeList: React.FC<EmployeeOvertimeProps> = ({
  status,
}: EmployeeOvertimeProps) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);
  const [params, setParams] = useState({
    divisionID: employee?.division_id,
  });
  useEffect(() => {
    const newParams = {
      divisionID: employee?.division_id,
    };
    setParams(newParams);
  }, [DataEmployee]);
  const [overtimes, setOvertimes] = useState<OvertimeType[]>();
  const { data: DataOvertimes } = useGetOvertime(params.divisionID);
  useEffect(() => {
    if (DataOvertimes) {
      setOvertimes(DataOvertimes);
    }
  }, [DataOvertimes, DataEmployee]);

  return (
    <div className="text-center">
      {overtimes != undefined ? (
        overtimes.map((overtime, index) => (
          <button
            key={index}
            onClick={() => navigate(`/employee-request/detail`, { state: { request: overtime } })}
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
              {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
              <div className="col-span-2 text-center m-auto p-2">
                <Text size="30px" fw={700}>
                  {overtime?.start_time != null ? formatterDate(overtime?.start_time, 'dd') : '.'}
                </Text>
                <Text style={{ marginTop: '-5px' }} size="xs">
                  {overtime?.start_time != null ? formatterDate(overtime?.start_time, 'MMM') : '-'}
                </Text>
              </div>
              <div className="col-span-10">
                <div className="my-auto text-right -mt-3 -me-3">
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color="blue"
                  >
                    lembur
                  </Badge>
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color={
                      overtime?.status == 'Disetujui'
                        ? 'green'
                        : overtime?.status == 'belum Disetujui'
                          ? 'yellow'
                          : 'red'
                    }
                  >
                    {overtime?.status}
                  </Badge>
                </div>
                <div className="my-auto text-left ms-3 mt-1">
                  <Divider orientation="vertical" />
                  <Text size="18px" fw={700}>
                    {overtime.detail}
                  </Text>
                </div>
              </div>
            </div>
            <div className="text-left">
              <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
                Tanggal pengajuan :{' '}
                {formatterDate(new Date(overtime.start_time), 'EEEE, dd MMM yyyy')}
              </Text>
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
          <span className="font-bold text-slate-400 text-xl">Belum ada data izin</span>
        </section>
      )}
    </div>
  );
};
