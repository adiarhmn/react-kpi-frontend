import { ActionIcon, Group } from '@mantine/core';
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
export const UpdateSchedule: React.FC = () => {
  const navigate = useNavigate();
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
    mutationSchedule.mutateAsync(dataForm, {
      onSuccess: (data) => {
        if (data.data) {
          const dataValidateSchedule = data.data.map((item: any) => ({
            employee_schedule_id: item.id,
            default_shift: shift_id,
          }));
          mutationValidateSchedule.mutateAsync(dataValidateSchedule, {
            onSuccess: () => {
              navigate(-1);
            },
            onError: () => {},
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

        <FormSchedule loading={mutationSchedule.isPending} onsubmit={handleSubmit} />
      </section>
    </main>
  );
};
