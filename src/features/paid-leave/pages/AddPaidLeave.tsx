import { Button, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';
// eslint-disable-next-line no-restricted-imports
import { useCreateRequest } from '@/features/leave/api';

export const AddPaidLeave: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      date_start: new Date(),
      date_end: new Date(new Date().setDate(new Date().getDate() + 5)),
      description: '',
    },
    validate: {
      description: (value) => (value === '' ? 'Keterangan tidak boleh kosong' : null),
    },
  });

  const mutationCreatePaidLeave = useCreateRequest();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const paidLeaveData = {
      date_start: formatterDate(form.values.date_start, 'yyyy-MM-dd'),
      date_end: formatterDate(form.values.date_end, 'yyyy-MM-dd'),
      type: 'cuti',
      description: form.values.description,
      employee_id: creds?.employee_id,
    };

    await mutationCreatePaidLeave.mutateAsync(paidLeaveData, {
      onSuccess: (data) => {
        localStorage.setItem('hasNotifiedPaidLeave', 'no');
        navigate('/paid-leave', {
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
            <h2 className="font-semibold ">Pengajuan Cuti</h2>
          </div>
        </div>
        <div className="p-2 -mt-2">
          <form onSubmit={handleSubmitForm}>
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
                autosize
                minRows={4}
                label="Keterangan"
                description=""
                placeholder="masukkan keterangan cuti"
                {...form.getInputProps('description')}
              />
            </div>
            <div className="w-full mt-5 grid grid-cols-12 text-center">
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
