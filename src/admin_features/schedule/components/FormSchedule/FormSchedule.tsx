import { Button, Group, MultiSelect, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetDivisions } from '@/admin_features/division/api';
import { useGetEmployees } from '@/admin_features/employees/api';
import { useGetShift } from '@/admin_features/shift/api';
import { DivisionType, EmployeeType, ShiftType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';
import { formatDateToString, getStartAndEndOfMonth } from '@/utils/format';

export type FormDataSchedules = {
  date_start: string;
  date_end: string;
  employee_id: number;
};

interface FormScheduleProps {
  loading: boolean;
  onsubmit: (data: FormDataSchedules[], shift_id: number) => void;
}

export const FormSchedule: React.FC<FormScheduleProps> = ({ loading, onsubmit }) => {
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

  const form = useForm({
    initialValues: {
      division_id: '0',
      shift_id: '0',
      employees: [],
    },
  });

  useEffect(() => {
    if (form.values.division_id !== undefined) {
      // Clear Employees
      form.setFieldValue('employees', []);
      setDivision(form.values.division_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.division_id]);

  const { startOfMonth, endOfMonth } = getStartAndEndOfMonth(month);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Membuat Format sesuai backend api
    const dataPostSchedule = (form.values.employees as string[]).map((employee: string) => ({
      date_start: formatDateToString(startOfMonth.toString()),
      date_end: formatDateToString(endOfMonth.toString()),
      employee_id: parseInt(employee),
    }));

    onsubmit(dataPostSchedule, parseInt(form.values.shift_id));
  };

  // Mengisi Data Dari Inputan
  const {
    data: DataEmployees,
    error,
    isLoading,
  } = useGetEmployees(creds?.company_id, parseInt(division));
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
  const optionsMultiselect = DataEmployees.map((employee: EmployeeType) => ({
    value: employee.id.toString(),
    label: employee.name,
  }));

  const optionsDivision = dataDivision.map((division: DivisionType) => ({
    value: division.id.toString(),
    label: division.division_name,
  }));

  const optionsMultiselectShift = DataShift.data.map((shift: ShiftType) => ({
    value: shift.id.toString(),
    label: shift.shift_name,
  }));

  const handleSelectAll = () => {
    const allEmployees = DataEmployees.map((employee: any) => employee.id.toString());
    form.setFieldValue('employees', allEmployees);
  };
  return (
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
          data={[...optionsDivision, { value: '0', label: 'Semua Divisi' }]}
          defaultValue="0"
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

        <Group className="col-span-2">
          <MultiSelect
            className="flex-grow"
            label="Pilih Karyawan"
            placeholder="Pilih Karyawan"
            data={optionsMultiselect}
            {...form.getInputProps('employees')}
          ></MultiSelect>
          <Button className="mt-6" onClick={handleSelectAll}>
            Pilih Semua Karyawan
          </Button>
          <Button
            className="mt-6"
            color="red"
            onClick={() => {
              form.setFieldValue('employees', []);
            }}
          >
            Batal
          </Button>
        </Group>
      </div>

      <Button
        loading={loading}
        className="mt-4"
        type="submit"
        leftSection={<IconDeviceFloppy size={17} />}
      >
        Tambah Jadwal
      </Button>
    </form>
  );
};
