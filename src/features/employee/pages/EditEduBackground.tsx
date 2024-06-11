import { Button, Select, TextInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { IconChevronLeft, IconSchool } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const EditEduBackground: React.FC = () => {
  // [SUBMIT EDUCATION BACKGROUND]
  const mutationAddLateRequest = useCreateEduBackground();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const educationData = {
      id: null,
      type: form.values.jenjang,
      major: form.values.jurusan,
      name: form.values.namaSekolah,
      entry_year: formatterDate(form.values.tahunMasuk, 'yyyy'),
      graduation_year: formatterDate(form.values.tahunLulus, 'yyyy'),
      graduate_from: form.values.lulusanAsal,
      employee_id: creds?.employee_id,
    };

    await mutationAddLateRequest.mutateAsync(educationData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        localStorage.setItem('hasNotifiedEduBackground', 'no');
        navigate('/profile/edu-background', {
          state: { success: 'Data pendidikan berhasil ditambahkan!' },
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
            <h2 className="font-semibold ">Tambah Data Pendidikan</h2>
          </div>
          <IconSchool className="opacity-80" size={25} />
        </div>
        <div className="mx-auto p-2 w-80 text-slate-700 px-2">
          <form onSubmit={handleSubmitForm}>
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
            <div className="w-full mt-4 grid grid-cols-12 text-center">
              <div className="col-span-6 pe-1">
                <Button fullWidth type="submit" color="blue">
                  Simpan
                </Button>
              </div>
              <div className="col-span-6 ps-1">
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  fullWidth
                  color="grey"
                >
                  Batal
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
