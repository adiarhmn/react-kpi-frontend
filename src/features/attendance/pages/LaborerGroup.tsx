import { Divider } from '@mantine/core';
import { IconChevronLeft, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ListLaborerGroup } from '../components';

export const LaborerGroup: React.FC = () => {
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
            <h2 className="font-semibold ">Kelompok pekerja lepas</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <ListLaborerGroup />
    </main>
  );
};
