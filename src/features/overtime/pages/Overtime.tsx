import { Button } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { OvertimeList } from '@/features/history';

import { useGetOvertime } from '../api/getOvertime';
import { OvertimeType } from '../types';

export const Overtime: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [overtimeData, setOvertimes] = useState<OvertimeType[]>([]);
  const { data: DataOvertime } = useGetOvertime(creds?.employee_id);
  useEffect(() => {
    if (DataOvertime) {
      setOvertimes(DataOvertime);
    }
  }, [DataOvertime]);

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-1">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
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
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/overtime/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <OvertimeList overtimes={overtimeData} />
    </main>
  );
};
