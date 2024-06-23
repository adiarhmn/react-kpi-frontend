import { Button, Select, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';

import { useCreateRequest } from '../api';

export const AddAbsence: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      date_start: new Date(),
      date_end: new Date(new Date().setDate(new Date().getDate() + 2)),
      type: '',
      description: '',
    },
    validate: {
      type: (value) => (value === '' ? 'Tipe izin tidak boleh kosong' : null),
      description: (value) => (value === '' ? 'Keterangan tidak boleh kosong' : null),
    },
  });

  const mutationCreateRequest = useCreateRequest();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestData = {
      date_start: formatterDate(form.values.date_start, 'yyyy-MM-dd'),
      date_end: formatterDate(form.values.date_end, 'yyyy-MM-dd'),
      type: form.values.type,
      description: form.values.description,
      employee_id: creds?.employee_id,
    };

    await mutationCreateRequest.mutateAsync(requestData, {
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem('hasNotifiedRequest', 'no');
        // navigate('/late-request', { state: { success: 'Absensi berhasil diajukan!' } });
        navigate('/absence', {
          state: { success: `Pengajuan ${data.data.type} berhasil ditambahkan` },
        });
        close();
      },
    });
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
            <h2 className="font-semibold ">Pengajuan izin</h2>
          </div>
        </div>
        <div className="p-2 -mt-2">
          <form onSubmit={handleSubmitForm}>
            <div>
              <Select
                label="Tipe izin"
                name="type"
                data={['sakit', 'izin']}
                {...form.getInputProps('type')}
              />
            </div>
            <div>
              <DatePickerInput
                valueFormat="dddd, DD MMM YYYY"
                label="Tanggal mulai"
                placeholder="Pilih tanggal"
                {...form.getInputProps('date_start')}
              />
            </div>
            <div className="mt-2">
              <DatePickerInput
                valueFormat="dddd, DD MMM YYYY"
                label="Tanggal selesai"
                placeholder="Pilih tanggal"
                {...form.getInputProps('date_end')}
              />
            </div>
            <div className="mt-2">
              <Textarea
                label="Keterangan"
                placeholder="masukkan keterangan izin"
                autosize
                minRows={5}
                {...form.getInputProps('description')}
              />
            </div>
            {/* <div className="mt-2">
            <FileInput label="Lampiran" description="" placeholder="masukkan lampiran" />
          </div> */}
            <div className="w-full mt-7 grid grid-cols-12 text-center">
              <div className="col-span-6 pe-1">
                <Button fullWidth type="submit" color="blue">
                  Ajukan
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
    </main>
  );
};
