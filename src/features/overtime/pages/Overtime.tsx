import { Button } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Overtime: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
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

      <section className="min-h-96 flex flex-col items-center justify-center mt-10">
        <img
          className="w-40 mb-2 bg-slate-200 rounded-full p-2"
          src="/images/blank-canvas.svg"
          alt=""
        />
        <span className="font-bold text-slate-400 text-xl">Belum ada data lembur</span>
      </section>
    </main>
  );
};
