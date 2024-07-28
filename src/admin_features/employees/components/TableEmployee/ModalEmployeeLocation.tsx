import { Button, Divider, Modal, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useGetLocations } from '@/admin_features/location/api';
import { AttendanceLocationsType, EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useCreateLocationEmployee, useGetLocationEmployees } from '../../api';

interface ModalEmployeeLocationProps {
  employee?: EmployeeType;
  opened: boolean;
  close: () => void;
  open: () => void;
}
export const ModalEmployeeLocation: React.FC<ModalEmployeeLocationProps> = (props) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');

  const mutationCreate = useCreateLocationEmployee();

  const form = useForm({
    initialValues: {
      attendance_location_id: '',
    },
  });

  const { data: DataLocations, error, isLoading } = useGetLocations(creds?.company_id);
  const {
    data: DataLocationEmployee,
    isLoading: LoadEmployeeLocation,
    refetch,
  } = useGetLocationEmployees(props.employee?.id);

  if (isLoading || LoadEmployeeLocation) {
    return <div className="w-full min-h-20 flex items-center justify-center">Loading...</div>;
  }
  if (error || DataLocations.length < 1) return null;

  const OptionsLocatios = DataLocations?.map((location: AttendanceLocationsType) => {
    return {
      value: location.id?.toString(),
      label: location.name,
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      employee_id: props.employee?.id,
      attendance_location_id: parseInt(form.values.attendance_location_id),
    };

    mutationCreate.mutateAsync(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title={<span className="font-bold">Lokasi Karyawan</span>}
    >
      <div>
        <div className="text-sm font-semibold">{props?.employee?.name}</div>
        <div className="text-xs -mt-1 text-slate-400 mb-2">
          {props?.employee?.division.division_name}
        </div>
        <div className="border rounded border-slate-300 p-2">
          <table className="text-xs w-full">
            <thead>
              <tr>
                <th className="font-semibold">Nama Lokasi</th>
                <th className="font-semibold">Latitude</th>
                <th className="font-semibold">Longitude</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {DataLocationEmployee?.map((location: any) => {
                return (
                  <tr key={location.id}>
                    <td>{location.attendance_location.name}</td>
                    <td>{location.attendance_location.latitude}</td>
                    <td>{location.attendance_location.longitude}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Divider className="my-3"></Divider>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Select
            label="Tambahkan Lokasi Presensi"
            placeholder="Pilih Lokasi"
            size="xs"
            className="grow"
            data={OptionsLocatios}
            defaultValue={OptionsLocatios?.[0].value}
            required
            {...form.getInputProps('attendance_location_id')}
          />
          <Button loading={mutationCreate.isPending} type="submit" size="xs" className="mt-6">
            <IconPlus size={15}></IconPlus>
          </Button>
        </form>
      </div>

      <div>
        <Button
          onClick={props.close}
          className="mt-5"
          style={{ width: '100%' }}
          size="xs"
          color="red"
        >
          Tutup
        </Button>
      </div>
    </Modal>
  );
};
