/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
import { Button, Drawer, Fieldset, Modal, Select, Table } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ShiftType } from '@/admin_features/types';
// eslint-disable-next-line no-restricted-imports
import { useGetShift } from '@/features/schedule/api';
// eslint-disable-next-line no-restricted-imports
import { ScheduleListNew } from '@/features/schedule/components';
import { useAuth } from '@/features/auth';
import { AttendanceListSection } from '../component';

export const DataAttendance: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { creds } = useAuth();
  const [month, setMonth] = useState<Date>(new Date());
  const [selectShift, setSelectShift] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [shifts, setShifts] = useState<ShiftType[]>([]);
  const { data, isLoading, error } = useGetShift();
  useEffect(() => {
    if (data) {
      setShifts(data);
    }
  }, [data]);

  const navigate = useNavigate();
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
            <h2 className="font-semibold ">Riwayat absensi</h2>
          </div>
          <span className="font-semibold">
            {/* <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className="me-2 -ms-1" />
              Filter
            </Button> */}
          </span>
        </div>
      </section>
      <AttendanceListSection employee_id={creds?.employee_id} />

      <Drawer
        position="right"
        offset={3}
        size="80%"
        radius="sm"
        opened={opened}
        onClose={close}
        title="Filter"
      >
        <div>
          {' '}
          <Fieldset className="mb-2" legend="Shift">
            <Select
              className="-m-3"
              placeholder="Pilih shift"
              data={['pagi', 'siang', 'malam']}
              searchValue={selectShift}
              onSearchChange={setSelectShift}
              allowDeselect
            />
          </Fieldset>
          <Fieldset className="mb-2" legend="Status">
            <Select
              className="-m-3"
              placeholder="Pilih status"
              data={['on', 'off']}
              searchValue={selectStatus}
              onSearchChange={setSelectStatus}
              allowDeselect
            />
          </Fieldset>
        </div>
        <div className="text-right mt-3">
          <Button onClick={close} style={{ width: '160px' }}>
            Cari
          </Button>
        </div>
      </Drawer>
    </main>
  );
};
