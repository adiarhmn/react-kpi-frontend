/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { OvertimeType } from '@/features/overtime/types';
import { formatterDate } from '../api';
import { useAuth } from '@/features/auth';
import { useEffect, useState } from 'react';
import { useGetOvertime } from '@/features/overtime/api/getOvertime';

type OvertimeProps = {
  status: string | null;
  filterState: boolean | string;
};

export const OvertimeList: React.FC<OvertimeProps> = ({ status, filterState }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    employeeID: creds?.employee_id,
    status: status,
  });
  useEffect(() => {
    const newParams = {
      employeeID: creds?.employee_id,
      status,
    };
    setParams(newParams);
  }, [status]);
  const [overtimes, setOvertime] = useState<OvertimeType[]>([]);
  const { data: DataOvertime, isLoading: LoadingOvertime } = useGetOvertime(
    params.employeeID,
    params.status
  );
  useEffect(() => {
    if (DataOvertime) {
      setOvertime(DataOvertime);
    }
  }, [DataOvertime, status]);

  if (LoadingOvertime) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  return (
    <div className="text-center">
      {overtimes.length > 0 ? (
        overtimes.map((overtime, index) => (
          <button
            key={index}
            onClick={() =>
              navigate('/history/data-overtime/detail', { state: { overtime: overtime } })
            }
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
              <div className="col-span-2 text-center m-auto p-2">
                <Text size="30px" fw={700}>
                  {overtime?.start_time != null ? formatterDate(overtime?.start_time, 'dd') : '.'}
                </Text>
                <Text style={{ marginTop: '-5px' }} size="xs">
                  {overtime?.start_time != null ? formatterDate(overtime?.start_time, 'MMM') : '-'}
                </Text>
              </div>
              <div className="col-span-10 ms-2 text-left">
                <Text style={{ marginLeft: '4px' }} size="14px" fw={700}>
                  {overtime?.detail}
                </Text>
                <Divider my="sm" />
                <div className="-mt-2 w-full grid grid-cols-12">
                  <div className="col-span-6 text-left mt-1 ms-1">
                    <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="13px" fw={500}>
                      {overtime?.start_time != null
                        ? formatterDate(new Date(overtime?.start_time), 'HH:mm')
                        : '--:--'}{' '}
                      -
                      {overtime?.end_time != null
                        ? formatterDate(new Date(overtime?.end_time), 'HH:mm')
                        : '--:--'}
                    </Text>
                  </div>
                  <div className="col-span-6 text-right -mt-1">
                    <Badge
                      size="xs"
                      style={{
                        marginLeft: '4px',
                        borderRadius: '2px',
                      }}
                      color={overtime?.status == 'Disetujui' ? 'blue' : 'red'}
                    >
                      {overtime?.status}
                    </Badge>
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
          <span className="font-bold text-slate-400 text-xl">Belum ada data lembur</span>
        </section>
      )}
    </div>
  );
};
