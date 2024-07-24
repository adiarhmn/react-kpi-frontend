import { Button } from '@mantine/core';

import { TableAttendance } from '../../components';

export const AttendanceFreelancer: React.FC = () => {
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Kehadiran Pekerja</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut daftar kehadiran pekerja</div>
          </div>
          <Button>Download PDF</Button>
        </div>
        <div className="flex gap-2"></div>
        <div className="mt-7">
          <TableAttendance />
        </div>
      </section>
    </main>
  );
};
