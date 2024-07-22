import { MultiSelect, TextInput } from '@mantine/core';

export const FormGroup: React.FC = () => {
  return (
    <form>
      <TextInput className="mb-3" label="Nama Kelompok" placeholder="Nama Kelom" required />
      <MultiSelect
        label="Pilih Pekerja"
        className="mb-3"
        placeholder="Pilih Pekerja"
        data={[
          { value: '1', label: 'Pekerja 1' },
          { value: '2', label: 'Pekerja 2' },
          { value: '3', label: 'Pekerja 3' },
        ]}
        required
      />

      <MultiSelect
        label="Pilih Sesi atau Kegiatan"
        placeholder="Pilih Sesi / Kegiatan"
        data={[
          { value: '1', label: 'Sesi 1 - Pondasi' },
          { value: '2', label: 'Sesi 2 - Tiang' },
          { value: '3', label: 'Sesi 3 - Kawat' },
        ]}
        required
      />
    </form>
  );
};
