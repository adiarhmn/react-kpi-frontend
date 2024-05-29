/* eslint-disable linebreak-style */
import { Button, Drawer, Fieldset, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustmentsHorizontal, IconPlus, IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-restricted-imports
import { AbsenceList } from '@/features/history/component/AbsenceList';
//
export const Absence: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectType, setSelectType] = useState('');
  const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-3">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Pengajuan izin</h2>
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
            <Button className="shadow-sm" size="xs" onClick={open}>
              <IconAdjustmentsHorizontal className=" -ms-1" />
            </Button>
          </span>
        </div>
      </section>

      <AbsenceList status={'Belum%20Disetujui'} typeAbsence={selectType} modalState={opened} />

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
              placeholder="Pilih tipe"
              data={['Sakit', 'Izin']}
              searchValue={selectType}
              onSearchChange={setSelectType}
              allowDeselect
              clearable
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
