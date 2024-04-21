import { IconChevronLeft, IconPencil, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { OvertimeList } from '../component/OvertimeList';

export const DataOvertime: React.FC = () => {
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
          <div>
            <button
              onClick={() => navigate('/profile/biodata/edit')}
              className="bg-transparent pe-3"
            >
              <IconPlus size={21} />
            </button>
          </div>
        </div>
      </section>

      <OvertimeList />
    </main>
  );
};
