/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { Button, Drawer, Fieldset, Select, Tabs } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconChevronLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmployeeRequestList } from '../components';
import Swal from 'sweetalert2';
import { ShiftType } from '@/admin_features/types';
import { useGetShift } from '@/features/schedule/api';
import { useAuth } from '@/features/auth';
import { useDisclosure } from '@mantine/hooks';

export const EmployeeRequest: React.FC = () => {
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState('sakit');
  const { creds } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectShift, setSelectShift] = useState('');

  // [NOTIFICATION 🔔]
  const { state } = useLocation();
  useEffect(() => {
    const hasNotified = localStorage.getItem('hasNotifiedEmployeeRequest');
    if (state?.success && hasNotified != 'yes') {
      Swal.fire({
        width: '80%',
        title: state.success,
        timer: 3000,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      localStorage.setItem('hasNotifiedEmployeeRequest', 'yes');
    }
  }, [state, navigate]);
  // [END NOTIFICATION 🔔]

  const [selectStatus, setSelectStatus] = useState('Belum disetujui');
  // const { data: DataShift } = useGetShift(creds?.company_id);
  // useEffect(() => {
  //   if (DataShift) {
  //     setShifts(DataShift);
  //   }
  // }, [DataShift]);
  // const optionShift = shifts.map((shift: any) => ({
  //   value: shift.id.toString(),
  //   label: shift.shift_name,
  // }));
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
            <h2 className="font-semibold ">Permintaan anggota</h2>
          </div>
          <span className="font-semibold">
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className="me-2 -ms-1" />
              Filter
            </Button>
          </span>
        </div>
      </section>

      <Tabs color="#51CF66" variant="pills" defaultValue="sakit">
        <Tabs.List className="sm:w-screen w-full mx-5 text-center py-3 overflow-x-auto overflow-y-hidden mb-1">
          <div className="flex w-max justify-start gap-x-2 px-6">
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="sakit"
                onClick={() => setSelectType('sakit')}
              >
                Sakit
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="izin"
                onClick={() => setSelectType('izin')}
              >
                Izin
              </Tabs.Tab>
            </div>
            <div className="bg-white min-w-[8rem] shadow-md rounded-2xl">
              <Tabs.Tab
                style={{ width: '100%', borderRadius: '20px' }}
                color="blue"
                value="lembur"
                onClick={() => setSelectType('lembur')}
              >
                Lembur
              </Tabs.Tab>
            </div>
          </div>
        </Tabs.List>
      </Tabs>

      <EmployeeRequestList typeRequest={selectType} status={selectStatus} />

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
          <Fieldset className="mb-2" legend="Shift">
            <Select
              className="-m-3"
              placeholder="Pilih Shift"
              data={['Disetujui', 'Dtolak', 'Belum disetujui']}
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
