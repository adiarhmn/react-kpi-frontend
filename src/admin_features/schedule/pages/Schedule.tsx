import { Button, Loader, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconPencil, IconPlus, IconSettings } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableSchedule } from '../components';
import { formatDateToString } from '@/utils/format';

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
            Tambah Data
          </Button>
        )}
        {isSchedule && <Button leftSection={<IconPencil size={15} />}>Edit Data</Button>}
      </section>

      {/* Table */}
      <TableSchedule month={month} setMonth={setMonth} setIsSchedule={setIsSchedule} />
    </main>
  );
};
