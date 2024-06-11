import { Button, Select, TextInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconSchool } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';

import { useUpdateEducationBackground } from '../api';
import { EducationBackground } from '../types';

export const EditEduBackground: React.FC = () => {
  const location = useLocation();
  const { creds } = useAuth();
  const educationData = location.state.edu as EducationBackground;
  console.log('Data education : ', educationData);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ...educationData,
      entry_year: new Date(educationData.entry_year),
      graduation_year: new Date(educationData.graduation_year),
    },
    validate: {
      type: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
      name: (value: string) => (value.length < 8 ? 'Name must have at least 8 letters' : null),
      major: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    },
  });

  // [SUBMIT EDUCATION BACKGROUND]
  const mutationUpdateEduBackground = useUpdateEducationBackground();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const educationData = {
      id: form.values.id,
      type: form.values.type,
      major: form.values.major,
      name: form.values.name,
      entry_year: formatterDate(form.values.entry_year, 'yyyy'),
      graduation_year: formatterDate(form.values.graduation_year, 'yyyy'),
      graduate_from: form.values.graduate_from,
      employee_id: creds?.employee_id,
    };

    await mutationUpdateEduBackground.mutateAsync(educationData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        localStorage.setItem('hasNotifiedEduBackground', 'no');
        navigate('/profile/edu-background', {
          state: { success: 'Data pendidikan berhasil diubah!' },
        });
        close();
      },
    });
  };
  // [END SUBMIT EDUCATION BACKGROUND]

  const navigate = useNavigate();
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
            <h2 className="font-semibold ">Edit Data Pendidikan</h2>
          </div>
          <IconSchool className="opacity-80" size={25} />
        </div>
        <div className="mx-auto p-2 w-80 text-slate-700 px-2">
          <form onSubmit={handleSubmitForm}>
            <Select
              label="Jenjang pendidikan"
              name="jenjang"
              data={['S2', 'S1/D4', 'D3', 'D2', 'D1', 'SMA/SMK', 'SMP', 'SD']}
              {...form.getInputProps('type')}
            />
            <TextInput label="Jurusan" name="jurusan" {...form.getInputProps('major')} />
            <TextInput
              label="Nama sekolah / Universitas"
              name="namaSekolah"
              withAsterisk
              required
              {...form.getInputProps('name')}
            />
            <YearPickerInput
              label="Tahun masuk"
              name="tahunMasuk"
              withAsterisk
              {...form.getInputProps('entry_year')}
            />
            <YearPickerInput
              label="Tahun lulus"
              name="tahunLulus"
              withAsterisk
              {...form.getInputProps('graduation_year')}
            />
            <Select
              label="Lulusan asal"
              name="lulusanAsal"
              data={['Dalam negeri', 'Luar negeri']}
              {...form.getInputProps('graduate_from')}
            />
            <div className="w-full mt-4 grid grid-cols-12 text-center">
              <div className="col-span-6 pe-1">
                <Button
                  fullWidth
                  onClick={() => {
                    navigate(-1);
                  }}
                  color="grey"
                >
                  Batal
                </Button>
              </div>
              <div className="col-span-6 ps-1">
                <Button type="submit" fullWidth color="blue">
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="mx-auto max-w-sm w-full relative p-2 px-2 text-slate-700"></section>
    </main>
  );
};
