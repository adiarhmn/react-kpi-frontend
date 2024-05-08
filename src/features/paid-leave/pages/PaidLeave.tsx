import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const PaidLeave: React.FC = () => {
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
            <h2 className="font-semibold ">Data Cuti</h2>
          </div>
          <button
            className="bg-transparent me-2"
            onClick={() => {
              navigate('/overtime/add');
            }}
          >
            <IconPlus size={21} className="font-bold rounded-md" />
          </button>
        </div>
      </section>
    </main>
  );
};
