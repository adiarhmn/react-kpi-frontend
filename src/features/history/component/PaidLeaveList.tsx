import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAbsence, useGetAbsenceByType } from '../api';
import { AbsenceType } from '../types';
import { differenceInDays, format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useAuth } from '@/features/auth';
import { getDaysBetweenDates, formatterDate } from '../api/getAbsence';

type PaidLeaveProps = {
  status: string;
};

export const PaidLeaveList: React.FC<PaidLeaveProps> = ({ status }) => {
  const { creds } = useAuth();
  const [paidLeave, setPaidLeave] = useState<AbsenceType[]>([]);
  const { data, error, isLoading } = useGetAbsenceByType(creds?.id, 'Cuti', status);

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setPaidLeave(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  // console.log('Data Cuti : ', paidLeave);

  return (
    <div className="text-center">
      {paidLeave.length > 0 ? (
        paidLeave.map((leave, index) => (
          <button
            key={index}
            onClick={() => navigate('/history/data-paid-leave/detail')}
            className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
              {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
              <div className="col-span-2 text-center -ms-3">
                <Text size="30px" fw={700}>
                  {getDaysBetweenDates(leave.date_start, leave.date_end) + 1}
                </Text>
                <Text style={{ marginTop: '-5px' }} size="xs">
                  Hari
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
                    color="yellow"
                  >
                    {leave.type}
                  </Badge>
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color="red"
                  >
                    {leave.status}
                  </Badge>
                </div>
                <div className="my-auto text-center mt-2">
                  <Divider orientation="vertical" />
                  <Text size="18px" fw={700}>
                    {formatterDate(leave.date_start, 'dd')}-{' '}
                    {formatterDate(leave.date_end, 'dd MMM yyyy')}
                  </Text>
                </div>
              </div>
            </div>
            <div className="text-left">
              <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
                Tanggal pengajuan : {formatterDate(leave.created_at, 'EEEE, dd MMM yyyy')}
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
