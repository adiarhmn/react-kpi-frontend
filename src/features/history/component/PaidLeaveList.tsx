import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAbsence } from '../api';
import { AbsenceType } from '../types';
import { differenceInDays, format } from 'date-fns';
import { id } from 'date-fns/locale';

export const PaidLeaveList: React.FC = () => {
  const [paidLeave, setPaidLeave] = useState<AbsenceType[]>([]);
  const { data, error, isLoading } = useGetAbsence();

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

  function getDaysBetweenDates(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    return differenceInDays(endDate, startDate);
  }

  function formatdate(date: string | Date) {
    const dateToFormat: Date = new Date(date);
    const formattedDate = format(dateToFormat, 'EEEE, dd MMM yyyy', { locale: id });
    return formattedDate;
  }

  return (
    <div className="text-center">
      <button
        onClick={() => navigate('/history/data-paid-leave/detail')}
        className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
      >
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
          {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
          <div className="col-span-2 text-center -ms-3">
            <Text size="30px" fw={700}>
              10
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
                Cuti
              </Badge>
              <Badge
                size="xs"
                style={{
                  marginTop: '7px',
                  marginLeft: '4px',
                  borderRadius: '2px',
                }}
                color="green"
              >
                Disetujui
              </Badge>
            </div>
            <div className="my-auto text-center mt-2">
              <Divider orientation="vertical" />
              <Text size="18px" fw={700}>
                15 - 17 April 2024
              </Text>
            </div>
          </div>
        </div>
        <div className="text-left">
          <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
            Tanggal pengajuan : Sabtu, 13 April 2024
          </Text>
        </div>
      </button>
      <button
        onClick={() => navigate('/history/data-paid-leave/detail')}
        className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
      >
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
          {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
          <div className="col-span-2 text-center -ms-3">
            <Text size="30px" fw={700}>
              13
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
                Cuti
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
                Belum disetujui
              </Badge>
            </div>
            <div className="my-auto text-center mt-2">
              <Divider orientation="vertical" />
              <Text size="18px" fw={700}>
                10 - 11 Maret 2024
              </Text>
            </div>
          </div>
        </div>
        <div className="text-left">
          <Text style={{ marginLeft: '4px', padding: '8px' }} size="11px" fw={500}>
            Tanggal pengajuan : Selasa, 8 April 2024
          </Text>
        </div>
      </button>
    </div>
  );
};
