import { Button, FileInput, Select, Textarea } from '@mantine/core';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconClock24 } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { AbsenceType } from '../types';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://192.168.1.110:3000/api';

export const AddAbsence: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  function formatdate(date: string | number | Date) {
    const dateToFormat: Date = new Date(date);
    const formattedDate = format(dateToFormat, 'yyyy-MM-dd', { locale: id });
    return formattedDate;
  }

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      date_start: '',
      date_end: '',
      type: '',
      description: '',
    },
    validate: {
      date_start: (value) => (value === '' ? 'tanggal mulai tidak boleh kosong' : null),
      date_end: (value) => (value === '' ? 'tanggal selesai tidak boleh kosong' : null),
      type: (value) => (value === '' ? 'Tipe izin tidak boleh kosong' : null),
      description: (value) => (value === '' ? 'Keterangan tidak boleh kosong' : null),
    },
  });

  const createAbsence = async (absenceDataPost: AbsenceType) => {
    const response = await axios.post(`${BaseURL}/request`, absenceDataPost);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createAbsence,
    onSuccess: (data) => {
      console.log(data);
      if (data.status == 201) {
        navigate(-1);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const absenceData = {
      id: null,
      date_start: formatdate(form.values.date_start).toString(),
      date_end: formatdate(form.values.date_end).toString(),
      status: 'belum disetujui',
      type: form.values.type,
      description: form.values.description,
      employee_id: creds?.employee_id,
    };
    mutation.mutateAsync(absenceData);
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
          <form onSubmit={handleSubmit}>
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
                {mutation.isPending ? (
                  <Button fullWidth color="blue" disabled>
                    Loading...
                  </Button>
                ) : (
                  <Button fullWidth type="submit" color="blue">
                    Ajukan
                  </Button>
                )}
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
