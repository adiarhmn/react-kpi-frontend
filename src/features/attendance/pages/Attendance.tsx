import { Button, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowBarRight, IconArrowBarToRight, IconChevronLeft } from '@tabler/icons-react';

export const Attendance: React.FC = () => {
  return (
    <main className="min-h-96 relative">
      <div className="mx-auto w-80 bg-white shadow-xl p-5 rounded-xl mt-5 absolute bottom-20 right-1/2 translate-x-1/2">
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
