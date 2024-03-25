import { ActionIcon } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AttendanceList } from '../components';

export const Attendances: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <main className="pb-16">
      <header className="px-4 sticky top-0 z-10 bg-white py-3.5">
        <Link to="/" className="flex items-center">
          <ActionIcon variant="transparent">
            <IconChevronLeft className="text-gray-800" />
          </ActionIcon>
          <div className="font-bold ml-4">Kehadiran</div>
        </Link>
      </header>

      <section className="px-5">
        <DatePickerInput
          label="Tanggal"
          placeholder="Pick date"
          value={value}
          onChange={setValue}
          mx="auto"
          valueFormat="dddd, D MMMM YYYY"
          maxDate={new Date()}
        />
      </section>

      <AttendanceList date={value ?? new Date()} />
    </main>
  );
};
