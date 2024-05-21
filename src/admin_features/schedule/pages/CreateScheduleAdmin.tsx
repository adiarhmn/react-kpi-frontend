import { useGetEmployees } from '@/admin_features/employees/api';
import { ActionIcon, Button, Group, MultiSelect, Select, em } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCardboards, IconChevronLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useCreateSchedule, useValidateSchedule } from '../api';
import { useGetShift } from '@/admin_features/shift/api';
import { parse } from 'date-fns';

export const CreateSchedule: React.FC = () => {
  const navigate = useNavigate();
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

  const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

  console.log(startOfMonth, '-', endOfMonth);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Membuat Format sesuai backend api
    const dataPostSchedule = form.values.employees.map((employee: string) => ({
      date_start: formatDate(startOfMonth.toString()),
      date_end: formatDate(endOfMonth.toString()),
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
            },
          });
        }
      },
    });
  };

  // Fungsi untuk mendapatkan tanggal awal dan akhir bulan
  function getStartAndEndOfMonth(): { startOfMonth: Date; endOfMonth: Date } {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const endOfMonth = new Date(startOfNextMonth.getTime() - 1);

    return { startOfMonth, endOfMonth };
  }

  // Fungsi untuk mengubah format tanggal
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() mengembalikan bulan mulai dari 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Mengisi Data Dari Inputan
  const { data: DataEmployees, error, isLoading } = useGetEmployees();
  const { data: DataShift, error: errorShift, isLoading: isLoadingShift } = useGetShift();
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
              data={['Semua Divisi', 'Developer', 'Designer', 'Marketing', 'HRD', 'Finance']}
              defaultValue="Semua Divisi"
              {...form.getInputProps('division_id')}
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
