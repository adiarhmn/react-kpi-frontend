/* eslint-disable linebreak-style */
import { Button, Tabs } from '@mantine/core';
import { IconPlus, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AbsenceList } from '@/features/history';

//
export const Absence: React.FC = () => {
  const [selectType, setSelectType] = useState('sakit');

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
            <h2 className="font-semibold ">Pengajuan {selectType}</h2>
          </div>
          <span className="font-semibold">
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/absence/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <Tabs color="#51CF66" variant="pills" defaultValue="sakit">
        <section className="w-full mx-auto p-1 py-3 -mt-1">
          <Tabs.List className="w-full grid grid-cols-12 text-center">
            <div className="w-full grid grid-cols-12 text-center px-5 gap-x-2">
              <div className="col-span-6 bg-white shadow-md rounded-lg">
                <Tabs.Tab
                  style={{ width: '100%' }}
                  color="yellow"
                  value="sakit"
                  onClick={() => setSelectType('sakit')}
                >
                  Sakit
                </Tabs.Tab>
              </div>
              <div className="col-span-6 bg-white shadow-md rounded-lg">
                <Tabs.Tab
                  style={{ width: '100%' }}
                  color="blue"
                  value="izin"
                  onClick={() => setSelectType('izin')}
                >
                  Izin
                </Tabs.Tab>
              </div>
            </div>
          </Tabs.List>
        </section>
      </Tabs>

      <AbsenceList status={'Belum%20Disetujui'} typeAbsence={selectType} />
    </main>
  );
};
