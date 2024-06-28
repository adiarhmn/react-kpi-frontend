/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import { MonthPickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { useGetOvertime } from '@/features/overtime/api/getOvertime';
import { OvertimeType } from '@/features/overtime/types';
import { OvertimeList } from '../component/OvertimeList';
import { Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const DataOvertime: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectStatus, setSelectStatus] = useState('Disetujui');
  const [month, setMonth] = useState<Date | null>(new Date());
  const [overtimeData, setOvertime] = useState<OvertimeType[]>([]);
  const { data: DataOvertime } = useGetOvertime(creds?.employee_id);
  useEffect(() => {
    if (DataOvertime) {
      setOvertime(DataOvertime);
    }
  }, [DataOvertime]);

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Data lembur</h2>
          </div>
          <span className="font-semibold">
            {month?.toLocaleString('default', { month: 'long' })} {month?.getFullYear()}
          </span>
        </div>

        {/* Month Picker or Input Date */}
        <div>
          <p className="text-xs text-slate-400 mb-1">Pencarian berdasarkan bulan :</p>
          <MonthPickerInput size="xs" placeholder="Pick date" value={month} onChange={setMonth} />
        </div>
      </section>

      <Tabs color="#51CF66" variant="pills" defaultValue="Disetujui">
        <section className="w-full mx-auto p-1 py-3 -mt-1 -mb-2">
          <Tabs.List className="w-full grid grid-cols-12 text-center">
            <div className="w-full grid grid-cols-12 text-center px-5 gap-x-2">
              <div className="col-span-6 bg-white shadow-md rounded-lg">
                <Tabs.Tab
                  style={{ width: '100%' }}
                  color="green"
                  value="Disetujui"
                  onClick={() => setSelectStatus('Disetujui')}
                >
                  Disetujui
                </Tabs.Tab>
              </div>
              <div className="col-span-6 bg-white shadow-md rounded-lg">
                <Tabs.Tab
                  style={{ width: '100%' }}
                  color="red"
                  value="Ditolak"
                  onClick={() => setSelectStatus('Ditolak')}
                >
                  Ditolak
                </Tabs.Tab>
              </div>
            </div>
          </Tabs.List>
        </section>
      </Tabs>

      <OvertimeList status={selectStatus} filterState={opened} />
    </main>
  );
};
