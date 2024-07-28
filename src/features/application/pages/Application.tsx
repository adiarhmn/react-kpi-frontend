import { Button, Drawer, Fieldset, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconAdjustmentsHorizontal,
  IconChevronLeft,
  IconFileTime,
  IconHandStop,
  IconLuggage,
  IconPlus,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Application: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectStatus, setSelectStatus] = useState('Belum disetujui');
  const navigate = useNavigate();

  // [SET LOCALSTORAGE STATUS CHECKIN]
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isCheckedIn');
    return savedState ? JSON.parse(savedState) : false;
  });
  useEffect(() => {
    localStorage.setItem('isCheckedIn', JSON.stringify(isCheckedIn));
  }, [isCheckedIn]);
  // [END SET LOCALSTORAGE]

  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotified');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotified', 'yes');
      setIsCheckedIn(true);
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-1">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Pengajuan</h2>
          </div>
          {/* <span className="font-semibold">
            <Button
              className="shadow-sm me-1"
              size="xs"
              onClick={() => {
                navigate('/late-request/add');
              }}
            >
              <IconPlus className=" -ms-1" />
            </Button>
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className=" -ms-1" />
            </Button>
          </span> */}
        </div>
      </section>
      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/late-request')}
          className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative px-2 text-slate-700"
        >
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1">
            <div className="col-span-2 text-center m-auto p-2">
              <IconHandStop size={32} />
            </div>
            <div className="col-span-10 my-auto">
              <div className="text-right"></div>
              <div className="col-span-12 text-left ms-1">
                <Text c={'blue'} style={{ marginLeft: '6px' }} size="16px" fw={700}>
                  Pengajuan absen
                </Text>
              </div>
            </div>
          </div>
        </button>
        <button
          onClick={() => navigate('/paid-leave/')}
          className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative px-2 text-slate-700 mt-2"
        >
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1">
            <div className="col-span-2 text-center m-auto p-2">
              <IconLuggage size={32} />
            </div>
            <div className="col-span-10 my-auto">
              <div className="text-right"></div>
              <div className="col-span-12 text-left ms-1">
                <Text c={'blue'} style={{ marginLeft: '6px' }} size="16px" fw={700}>
                  Pengajuan cuti
                </Text>
              </div>
            </div>
          </div>
        </button>
        <button
          onClick={() => navigate('/absence')}
          className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative px-2 text-slate-700 mt-2"
        >
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1">
            <div className="col-span-2 text-center m-auto p-2">
              <IconFileTime size={32} />
            </div>
            <div className="col-span-10 my-auto">
              <div className="text-right"></div>
              <div className="col-span-12 text-left ms-1">
                <Text c={'blue'} style={{ marginLeft: '6px' }} size="16px" fw={700}>
                  Pengajuan sakit / izin
                </Text>
              </div>
            </div>
          </div>
        </button>
      </div>

      <Drawer
        position="right"
        offset={3}
        size="80%"
        radius="sm"
        opened={opened}
        onClose={close}
        title="Filter"
      >
        <div>
          <Fieldset className="mb-2" legend="Status">
            <Select
              className="-m-3"
              placeholder="Pilih Shift"
              data={['Disetujui', 'Ditolak', 'Belum disetujui']}
              searchValue={selectStatus}
              onSearchChange={setSelectStatus}
              allowDeselect
            />
          </Fieldset>
        </div>
        <div className="text-right mt-3">
          <Button onClick={close} style={{ width: '160px' }}>
            Cari
          </Button>
        </div>
      </Drawer>
    </main>
  );
};
