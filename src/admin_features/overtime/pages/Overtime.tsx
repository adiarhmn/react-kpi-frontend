import { MonthPickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TableOvertime } from '../components';

export const Overtime: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchMonth = new URLSearchParams(location.search).get('month');
  const searchYear = new URLSearchParams(location.search).get('year');

  const [month, setMonth] = useState<Date>(
    searchMonth ? new Date(Number(searchYear), Number(searchMonth) - 1) : new Date()
  );

  useEffect(() => {
    navigate(`/overtime?month=${month.getMonth() + 1}&year=${month.getFullYear()}`);
  }, [month, navigate]);

  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Pengajuan Lembur</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar pengajuan lembur yang terdaftar pada sistem
            </div>
            <MonthPickerInput
              label="Pick date"
              placeholder="Pick date"
              value={month}
              onChange={(value) => {
                if (value === null) {
                  setMonth(searchMonth ? new Date(searchMonth) : new Date());
                } else {
                  setMonth(value);
                }
              }}
            />
          </div>
        </div>
        <div className="mt-7">
          <TableOvertime month={month} />
        </div>
      </section>
    </main>
  );
};
