import { ActionIcon, Group, MultiSelect, Select } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
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
            <div className='text-xs text-slate-400 -mt-1'>Berikut form untuk menambahkan jadwal baru</div>
          </div>
        </Group>
        {/* Form Tambah Jadwal */}
        <form action="" className="mt-4">
          <div className="grid grid-cols-2 gap-5">
            <Select
              label="Pilih Divisi"
              placeholder="Pilih Divisi"
              data={['Semua Divisi', 'Developer', 'Designer', 'Marketing', 'HRD', 'Finance']}
              defaultValue="Semua Divisi"
            ></Select>
            <MultiSelect
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
        </form>
      </section>
    </main>
  );
};
