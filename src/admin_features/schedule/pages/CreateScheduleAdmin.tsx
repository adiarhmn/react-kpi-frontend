import { ActionIcon, Group, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useCreateSchedule, useValidateSchedule } from '../api';
import { FormDataSchedules, FormSchedule } from '../components';

type DataError = {
  message: string;
};
export const CreateSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [processLoading, setProcessLoading] = useState(false);
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const location = useLocation();
  const queryMonth = new URLSearchParams(location.search).get('month');
  if (!queryMonth) {
    navigate('/schedule');
  }

  const [monthDate] = useState<Date>(queryMonth ? new Date(queryMonth) : new Date());

  const mutationSchedule = useCreateSchedule();
  const mutationValidateSchedule = useValidateSchedule();
  const handleBack = () => {
    return navigate(-1);
  };

  const handleSubmit = async (dataForm: FormDataSchedules[], shift_id: number) => {
    setProcessLoading(true);
    mutationSchedule.mutateAsync(dataForm, {
      onSuccess: (data) => {
        if (data.data) {
          const dataValidateSchedule = data.data.map((item: any) => ({
            employee_schedule_id: item.id,
            default_shift: shift_id,
            default_attendance_place: 'WFO',
          }));
          mutationValidateSchedule.mutateAsync(dataValidateSchedule, {
            onSuccess: () => {
              setTimeout(() => {
                setProcessLoading(false);
                navigate(-1);
                notifications.show({
                  title: 'Berhasil',
                  message: 'Jadwal berhasil ditambahkan',
                  color: 'teal',
                });
              }, 2000);
            },
            onError: () => {
              setProcessLoading(false);
              notifications.show({
                title: 'Error',
                message: 'Gagal Menambahkan Jadwal',
                color: 'red',
              });
            },
          });
        }
      },
      onError: (err) => {
        if (err && (err as AxiosError).response) {
          const axiosError = err as AxiosError;
          const dataError = axiosError.response?.data as DataError;

          notifications.show({
            title: 'Error',
            message: dataError.message,
            color: 'red',
          });
        }
      },
    });
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
            <h1 className="font-semibold">
              Buat Jadwal Karyawan :{' '}
              {monthDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
            </h1>
            <div className="text-xs text-slate-400 -mt-1">
              Berikut form untuk menambahkan jadwal untuk Karyawan
            </div>
          </div>
        </Group>

        {processLoading ? (
          <div className="flex justify-center items-center w-full h-72">
            <div>
              <div className="flex justify-center">
                <Loader />
              </div>
              <div className="text-center text-sm text-slate-400 mt-2">
                Sedang memproses data, mohon tunggu sebentar...
              </div>
            </div>
          </div>
        ) : (
          <div>
            <FormSchedule loading={mutationSchedule.isPending} onsubmit={handleSubmit} />
          </div>
        )}
      </section>
    </main>
  );
};
