/* eslint-disable linebreak-style */
import { Button } from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatDateToString } from '@/utils/format';

import { TableSchedule } from '../components';

export const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const location = useLocation();
  const [isSchedule, setIsSchedule] = useState(false);

  const searchMonth = new URLSearchParams(location.search).get('month');

  const [month, setMonth] = useState<Date>(searchMonth ? new Date(searchMonth) : new Date());

  useEffect(() => {
    navigate(`/schedule?month=${formatDateToString(month.toString())}`);
  }, [month, navigate]);

  return (
    <main>
      {/* Header */}
      <section className="bg-white p-2 px-4 rounded-lg shadow-lg mb-4 flex justify-between">
        <div>
          <h1 className="font-semibold">
            Jadwal : {month.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
          </h1>
          <div className="text-xs -mt-1 text-slate-500">
            Berikut Data Jadwal pada bulan Juni 2024
          </div>
        </div>
        {!isSchedule && (
          <Button
            onClick={() =>
              navigate(`/schedule/create?month=${formatDateToString(month.toString())}`)
            }
            leftSection={<IconPlus size={15} />}
          >
            Buat Jadwal
          </Button>
        )}
        {isSchedule && (
          <Button
            onClick={() =>
              navigate(`/schedule/update?month=${formatDateToString(month.toString())}`)
            }
            leftSection={<IconPencil size={15} />}
          >
            Tambah Karyawan
          </Button>
        )}
      </section>

      {/* Table */}
      <TableSchedule month={month} setMonth={setMonth} setIsSchedule={setIsSchedule} />
    </main>
  );
};
