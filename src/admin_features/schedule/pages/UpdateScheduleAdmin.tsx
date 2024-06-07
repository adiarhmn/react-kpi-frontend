import { ActionIcon, Button, Group, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetEmployees } from '@/admin_features/employees/api';
import { useGetShift } from '@/admin_features/shift/api';
import { useAuth } from '@/features/auth';
import { formatDateToString, getStartAndEndOfMonth } from '@/utils/format';

import { useCreateSchedule, useValidateSchedule } from '../api';

type DataError = {
  message: string;
};
export const UpdateSchedule: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const month = query.get('month') || '';
  const DataMonthDate = new Date(month);

  if (!month) {
    navigate('/schedule');
  }

  const mutationSchedule = useCreateSchedule();
  const mutationValidateSchedule = useValidateSchedule();
  const handleBack = () => {
    return navigate(-1);
  };

  const form = useForm({
    initialValues: {
      division: 'Semua Divisi',
      shift_id: '0',
      employees: [],
    },
  });

  const { startOfMonth, endOfMonth } = getStartAndEndOfMonth(month);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Membuat Format sesuai backend api
    const dataPostSchedule = form.values.employees.map((employee: string) => ({
      date_start: formatDateToString(startOfMonth.toString()),
      date_end: formatDateToString(endOfMonth.toString()),
      employee_id: parseInt(employee),
    }));

    mutationSchedule.mutateAsync(dataPostSchedule, {
      onSuccess: (data) => {
        console.log('Response:', data);
        if (data.data) {
          const dataValidateSchedule = data.data.map((item: any) => ({
            employee_schedule_id: item.id,
            default_shift: parseInt(form.values.shift_id),
          }));
          mutationValidateSchedule.mutateAsync(dataValidateSchedule, {
            onSuccess: (data) => {
              console.log('Success:', data);
              navigate(-1);
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

  // Mengisi Data Dari Inputan
  const { data: DataEmployees, error, isLoading } = useGetEmployees(creds?.company_id);
  const {
    data: DataShift,
    error: errorShift,
    isLoading: isLoadingShift,
  } = useGetShift(creds?.company_id);
  if (isLoading || isLoadingShift) {
    return <div>Loading...</div>; // or your loading component
  }

  if (error || errorShift) {
    return <div>Error: {error?.message || errorShift?.message}</div>; // or your error component
  }

  // Mengisi data untuk Multiselect Karyawan
  const optionsMultiselect = DataEmployees.map((employee: any) => ({
    value: employee.id.toString(),
    label: employee.name,
  }));

  const optionsMultiselectShift = DataShift.data.map((shift: any) => ({
    value: shift.id.toString(),
    label: shift.shift_name,
  }));

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
              Update Jadwal :{' '}
              {DataMonthDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
            </h1>
            <div className="text-xs text-slate-400 -mt-1">
              Berikut form untuk menambahkan karyawan baru untuk jadwal{' '}
              {DataMonthDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </Group>

        {/* Form Tambah Jadwal */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Divisi Input */}
            <Select
              label={
                <span className="font-semibold">
                  Pilih Divisi <span className="italic text-xs">(Filter pencarian karyawan)</span>
                </span>
              }
              className="col-span-2 lg:col-span-1"
              placeholder="Pilih Divisi"
              data={['Semua Divisi', 'Developer', 'Designer', 'Marketing', 'HRD', 'Finance']}
              defaultValue="Semua Divisi"
              {...form.getInputProps('division')}
            ></Select>

            {/* Shift Selection */}
            <Select
              label="Pilih Shift"
              className="col-span-2 lg:col-span-1"
              placeholder="Pilih Shift"
              data={optionsMultiselectShift}
              defaultValue="Shift 1"
              {...form.getInputProps('shift_id')}
            ></Select>

            <MultiSelect
              className="col-span-2"
              label="Pilih Karyawan"
              placeholder="Pilih Karyawan"
              data={optionsMultiselect}
              {...form.getInputProps('employees')}
            ></MultiSelect>
          </div>

          <Button className="mt-4" type="submit" leftSection={<IconDeviceFloppy size={17} />}>
            Tambah Karyawan
          </Button>
        </form>
      </section>
    </main>
  );
};
