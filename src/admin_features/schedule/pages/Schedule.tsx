/* eslint-disable linebreak-style */
import { Button } from '@mantine/core';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDateToString } from '@/utils/format';

import { TableSchedule } from '../components';

export const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [isSchedule, setIsSchedule] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());

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
        {isSchedule && <Button leftSection={<IconPencil size={15} />}>Edit Data</Button>}
      </section>

      {/* Table */}
      <TableSchedule month={month} setMonth={setMonth} setIsSchedule={setIsSchedule} />
    </main>
  );
};
