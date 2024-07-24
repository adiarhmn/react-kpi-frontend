import { Button, Divider } from '@mantine/core';
import { IconCalendarUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const LaborerCardAttendance: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
      <div className="flex justify-between text-xs items-center p-2">
        <span className="text-base font-bold text-blue-700">Data pekerja lepas</span>
      </div>
      <Divider size={'sm'} />
      <div className="w-full p-2">
        <div className="grid grid-cols-12 divide-x divide-gray-300 ">
          <div className="col-span-6 p-4 text-center">
            <div className="p-2 bg-transparent text-green-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              4
            </div>
            <div className="text-xs -mt-2">Kelompok</div>
          </div>
          <div className="col-span-6 p-4 text-center">
            <div className="p-2 bg-transparent text-blue-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              20
            </div>
            <div className="text-xs -mt-2">Pekerja Lepas</div>
          </div>
          <div className="col-span-12 mt-4">
            <Button
              onClick={() => navigate(`/laborer-group`)}
              fullWidth
              type="submit"
              rightSection={<IconCalendarUser />}
            >
              Absensi pekerja lepas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
