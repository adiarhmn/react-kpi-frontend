import { Button } from '@mantine/core';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { PaidLeaveList } from '@/features/history';

export const PaidLeave: React.FC = () => {
  // [NOTIFICATION 🔔]
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotifiedPaidLeave');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotifiedPaidLeave', 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Pengajuan cuti</h2>
          </div>
          <span className="font-semibold">
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/paid-leave/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <PaidLeaveList status={'Belum%20Disetujui'} />
    </main>
  );
};
