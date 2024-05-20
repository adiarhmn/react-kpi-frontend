import { Button, FileInput, Select, TextInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconSchool } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export const EduBackgroundAdd: React.FC = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      jenjang: '',
      jurusan: '',
      namaSekolah: '',
      tahunLulus: '',
      tahunMasuk: '',
      lulusanAsal: '',
    },
    validate: {
      jenjang: (value) => (value === '' ? 'Jenjang tidak boleh kosong' : null),
      tahunMasuk: (value) => (value === '' ? 'Tahun masuk tidak boleh kosong' : null),
      tahunLulus: (value) => (value === '' ? 'Tahun lulus tidak boleh kosong' : null),
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const educationData = {
      type: form.values.jenjang,
      major: form.values.jurusan,
      name: form.values.namaSekolah,
      entry_year: form.values.tahunMasuk,
      graduation_year: form.values.tahunLulus,
      graduate_from: form.values.lulusanAsal,
      employee_id: 1,
    };

    try {
      const response = await axios.post(`${BaseURL}/employee_education`, educationData);
      if (response.data.status == 201) {
        setAlert(true);
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }
    } catch (error) {}
  };
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Tambah Data Pendidikan</h2>
          </div>
          <IconSchool className="opacity-80" size={25} />
        </div>
        <div className="mx-auto p-2 w-80 text-slate-700 px-2">
          <form onSubmit={handleSubmit}>
            <Select
              label="Jenjang pendidikan"
              name="jenjang"
              data={['S2', 'S1/D4', 'D3', 'D2', 'D1', 'SMA/SMK', 'SMP', 'SD']}
              {...form.getInputProps('jenjang')}
            />
            <TextInput label="Jurusan" name="jurusan" {...form.getInputProps('jurusan')} />
            <TextInput
              label="Nama sekolah / Universitas"
              name="namaSekolah"
              withAsterisk
              required
              {...form.getInputProps('namaSekolah')}
            />
            <YearPickerInput
              label="Tahun masuk"
              name="tahunMasuk"
              withAsterisk
              {...form.getInputProps('tahunMasuk')}
            />
            <YearPickerInput
              label="Tahun lulus"
              name="tahunLulus"
              withAsterisk
              {...form.getInputProps('tahunLulus')}
            />
            <Select
              label="Lulusan asal"
              name="lulusanAsal"
              data={['Dalam negeri', 'Luar negeri']}
              {...form.getInputProps('lulusanAsal')}
            />
            <div className="flex gap-3">
              <Button type="submit" color="blue" className="mt-5">
                Simpan
              </Button>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                type="button"
                color="gray"
                className="mt-5"
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      </section>
      <section className="mx-auto max-w-sm w-full relative p-2 px-2 text-slate-700"></section>
    </main>
  );
};
