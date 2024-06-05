import { ActionIcon, Button, Group, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetEmployees } from '@/admin_features/employees/api';
import { useGetShift } from '@/admin_features/shift/api';
import { useAuth } from '@/features/auth';
import { formatDateToString, getStartAndEndOfMonth } from '@/utils/format';

import { useCreateSchedule, useValidateSchedule } from '../api';
import { useGetDivisions } from '@/admin_features/division/api';
import { useState } from 'react';

export const CreateSchedule: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const [division, setDivision] = useState('0');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const month = query.get('month') || '';
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
      division_id: '0',
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
            onError: (error) => {
              console.log('Gagal Insert Data:', error);
            },
          });
        }
      },
      onError: (error) => {
        console.log('Gagal Insert Data:', error);
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
  const { data: dataDivision, isLoading: loadDivision } = useGetDivisions(creds?.company_id);
  if (isLoading || isLoadingShift || loadDivision) {
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

  const optionsDivision = dataDivision.map((division: any) => ({
    value: division.id.toString(),
    label: division.division_name,
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
            <h1 className="font-semibold">Tambah Jadwal</h1>
            <div className="text-xs text-slate-400 -mt-1">
              Berikut form untuk menambahkan jadwal baru
            </div>
          </div>
        </Group>

        {/* Form Tambah Jadwal */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Divisi Input */}
            <Select
              label="Pilih Divisi"
              className="col-span-2 lg:col-span-1"
              placeholder="Pilih Divisi"
              data={[...optionsDivision, { value: '0', label: 'Semua Divisi' }]}
              defaultValue="Semua Divisi"
              {...form.getInputProps('division_id', {
                onChange: (value: any) => {
                  setDivision(value);
                },
              })}
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
            Tambah Jadwal
          </Button>
        </form>
      </section>
    </main>
  );
};
