import { Button, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowBarRight, IconArrowBarToRight, IconChevronLeft } from '@tabler/icons-react';

export const Attendance: React.FC = () => {
  return (
    <main>
      <header className="px-4 sticky top-0 z-10 bg-white py-3.5 shadow-lg">
        <Link to="/" className="flex items-center">
          <ActionIcon variant="transparent">
            <IconChevronLeft className="text-gray-800" />
          </ActionIcon>
          <div className="font-bold ml-4">Kehadiran</div>
        </Link>
      </header>

      <div className="mx-auto w-80 bg-white shadow-xl p-5 rounded-xl mt-5">
        <p className="text-center text-sm text-gray-600">Monday, 12 Mar 2024 </p>
        <h1 className="text-center font-bold">Morning Shift</h1>
        <h1 className="text-center mb-5">08.00 - 12.00</h1>
        <div className="flex justify-between">
          <Button variant="filled" rightSection={<IconArrowBarToRight />} fullWidth>
            Check in
          </Button>
        </div>
      </div>
    </main>
  );
};
