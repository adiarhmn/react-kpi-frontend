/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
import { Button, Drawer, Fieldset, Select, Text } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ShiftType } from '@/admin_features/types';

import { useGetShift } from '../api';
import { ScheduleList, ScheduleListNew } from '../components';
import { useAuth } from '@/features/auth';

export const Schedule: React.FC = () => {
  const location = useLocation();
  const { creds } = useAuth();
  // const [opened, { open, close }] = useDisclosure(false);
  // const [month, setMonth] = useState<Date>(new Date());
  // const [selectShift, setSelectShift] = useState('');
  // const [selectStatus, setSelectStatus] = useState('');
  const employee = location.state.employee;
  console.log('Data employee', employee)
  let employeeID: number | string | undefined = '';
  if (location.state != null) {
    employeeID = location.state.employee.id;
  } else {
    employeeID = creds?.employee_id;
  }

  const [shifts, setShifts] = useState<ShiftType[]>([]);
  const { data: DataShift } = useGetShift();

  useEffect(() => {
    if (DataShift) {
      setShifts(DataShift);
    }
  }, [DataShift]);

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
            <h2 className="font-semibold ">Data Jadwal bulanan</h2>
          </div>
          {/* <span className="font-semibold">
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className="me-2 -ms-1" />
              Filter
            </Button>
          </span> */}
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 ">
        <div className="flex justify-between items-center text-blue-700">
          
          <span className="font-semibold"></span>
        </div>
        <div className="grid grid-cols-12 px-2">
          <div className="col-span-4 px-2 flex items-left">
            <img className="w-full rounded-lg p-2" src="/images/profile-pic.svg" alt="" />
          </div>
          <div className="col-span-8">
            <div className="mt-2">
              <Text size="auto" fw={700}>
                {employee.name}
              </Text>
            </div>
            <div>
              <Text size="xs" c="grey" fw={700}>
                {employee.user.role}
              </Text>
            </div>
          </div>
        </div>
      </section>

      <ScheduleList />

      {/* <Drawer
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
      </Drawer> */}
    </main>
  );
};
