/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
import { AttendanceList } from '@/features/history/component/AttendanceList';
import { Button, Drawer, Fieldset, Select } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const EmployeeAttendance: React.FC = () => {
  const location = useLocation();
  const employee_id = location.state.employee_id as number;
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [month, setMonth] = useState<Date>(new Date());
  const [selectShift, setSelectShift] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
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
            <h2 className="font-semibold ">Data Jadwal</h2>
          </div>
          <span className="font-semibold">
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className="me-2 -ms-1" />
              Filter
            </Button>
          </span>
        </div>

        {/* Month Picker or Input Date */}
        <div>
          <div className="w-full grid grid-cols-12">
            <div className="col-span-12">
              <p className="text-xs text-slate-400 mb-1">Rekap jadwal bulan :</p>
              <MonthPickerInput
                size="xs"
                placeholder="Pick date"
                value={month}
                onChange={(value) => {
                  if (value === null) {
                    setMonth(new Date());
                  } else {
                    setMonth(value);
                  }
                }}
              />
            </div>
            <div className="col-span-0"></div>
          </div>
        </div>
      </section>

      <AttendanceList
        month={month}
        shift={selectShift}
        status={selectStatus}
        modalState={opened}
        employee_id={employee_id}
      />

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
