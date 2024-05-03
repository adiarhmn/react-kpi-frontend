import { ActionIcon, Button, Group, MultiSelect, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCardboards, IconChevronLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const CreateSchedule: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1);
  };

  return (
    <main>
      {/* Header */}
      <section className="bg-white p-3 px-4 rounded-lg shadow-lg mb-4">
        <Group>
          <ActionIcon onClick={handleBack}>
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h1 className="font-semibold">Tambah Jadwal</h1>
            <div className="text-xs text-slate-400 -mt-1">
              Berikut form untuk menambahkan jadwal baru
            </div>
          </div>
        </Group>
        {/* Form Tambah Jadwal */}
        <form action="" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Select
              label="Pilih Divisi"
              className="col-span-2 lg:col-span-1"
              placeholder="Pilih Divisi"
              data={['Semua Divisi', 'Developer', 'Designer', 'Marketing', 'HRD', 'Finance']}
              defaultValue="Semua Divisi"
            ></Select>
            <Select
              label="Pilih Shift"
              className="col-span-2 lg:col-span-1"
              placeholder="Pilih Shift"
              data={['Shift 1', 'Shift 2', 'Shift 3']}
              defaultValue="Shift 1"
            ></Select>

            {/* Pilih Periode Hari */}
            <div className="col-span-2 flex flex-col lg:flex-row gap-2 items-center">
              <DateInput label="Pilih Priode" className="flex-grow w-full"></DateInput>
              <div className="pt-5 text-slate-400 text-xs hidden lg:block">S/D</div>
              <DateInput label="Pilih Priode" className="flex-grow w-full"></DateInput>
            </div>
            <MultiSelect
              className="col-span-2"
              label="Pilih Karyawan"
              placeholder="Pilih Karyawan"
              data={[
                'Adi Aulia Rahman',
                'David Hadi Nugroho',
                'Muhammad Iqbal',
                'Dian Lucky Prayogi',
              ]}
            ></MultiSelect>
          </div>

          <Button className="mt-4" type="submit" leftSection={<IconDeviceFloppy size={17} />}>
            Tambah Jadwal
          </Button>
        </form>
      </section>
    </main>
  );
};
