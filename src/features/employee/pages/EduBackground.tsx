import { Button } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { EduList } from '../components/EduList';

export const EduBackground: React.FC = () => {
  const navigate = useNavigate();
  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotifiedEduBackground');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotifiedEduBackground', 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-3">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Data pendidikan</h2>
          </div>
          <span className="font-semibold">
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/profile/edu-background/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <EduList />
    </main>
  );
};
