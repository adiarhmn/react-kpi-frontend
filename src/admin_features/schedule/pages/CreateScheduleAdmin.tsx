import { ActionIcon, Group, MultiSelect } from '@mantine/core';
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
          <h1 className="font-semibold">Tambah Jadwal</h1>
        </Group>
        {/* Form Tambah Jadwal */}
        <form action="">
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
        </form>
      </section>
    </main>
  );
};
