import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetDivisions } from '@/admin_features/division/api';
import { EmployeeType, UserType } from '@/admin_features/types';
import { useGetUsersById } from '@/admin_features/users/api';
import { useAuth } from '@/features/auth';

interface Props {
  onsubmit: (data: any) => void;
  loading: boolean;
  initialValues?: EmployeeType;
}

export type FormEmployeeType = EmployeeType & UserType;

export const FormEmployee: React.FC<Props> = ({ onsubmit, loading, initialValues }) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const { state } = useLocation();
  if (creds === null) navigate('/login');

  if (!state.employee) {
    navigate(-1);
  }

  const { data: DataDivision, isLoading: loadingDivisions } = useGetDivisions(creds?.company_id);
  const { data: DataUser, isLoading: loadUser } = useGetUsersById(initialValues?.user_id ?? 0);

  const NavBack = () => {
    navigate(-1);
  };

  const form = useForm({
    initialValues: {
      ...initialValues,
      division_id: initialValues?.division_id.toString() ?? '',
      username: DataUser?.username ?? '',
      password: '',
    } || {
      id: initialValues?.id ?? 0,
      user_id: initialValues?.user_id ?? 0,
      nip: '',
      nik: '',
      no_bpjs: '',
      name: '',
      sex: 'male',
      birth_date: '',
      religion: '',
      address: '',
      rt: '',
      rw: '',
      village: '',
      subdistrict: '',
      district: '',
      province: '',
      postal_code: '',
      phone: '',
      status: true,
      username: '',
      password: '',
      division_id: '',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const employeeDataPost = {
      nip: form.values.nip,
      nik: form.values.nik,
      no_bpjs: form.values.no_bpjs,
      name: form.values.name,
      sex: form.values.sex,
      birth_date: form.values.birth_date,
      religion: form.values.religion,
      address: form.values.address,
      rt: form.values.rt,
      rw: form.values.rw,
      village: form.values.village,
      subdistrict: form.values.subdistrict,
      district: form.values.district,
      province: form.values.province,
      postal_code: form.values.postal_code,
      phone: form.values.phone,
      status: form.values.status,
      username: form.values.username,
      password: form.values.password,
      division_id: parseInt(form.values.division_id.toString()),
      user_id: initialValues?.user_id,
      company_id: creds?.company_id,
    };

    onsubmit(employeeDataPost);
  };

  if (loadingDivisions || loadUser) {
    return <div>Loading...</div>;
  }

  const optionDataDivision = DataDivision.map((division: any) => ({
    value: division.id.toString(),
    label: division.division_name,
  }));

  const optionSex = [
    {
      value: 'male',
      label: 'Laki-laki',
    },
    {
      value: 'female',
      label: 'Perempuan',
    },
  ];

  console.log('form.values', form.values);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label={
          <span className="font-semibold">
            Username <span className="text-xs italic">(Akun Sistem)</span>
          </span>
        }
        placeholder="Username"
        required
        {...form.getInputProps('username')}
      />
      <TextInput
        className="mb-3"
        label={
          <span className="font-semibold">
            Password <span className="text-xs italic">(Password Akun Sistem)</span>
          </span>
        }
        placeholder="Password"
        required={initialValues?.id === 0}
        {...form.getInputProps('password')}
      />
      <Select
        label="Pilih Divisi"
        className="col-span-2 lg:col-span-1 mb-3"
        placeholder="Pilih Divisi"
        data={optionDataDivision}
        required
        {...form.getInputProps('division_id')}
      ></Select>
      <TextInput
        className="mb-3"
        label="Nama Karyawan"
        placeholder="Nama Karyawan"
        required
        {...form.getInputProps('name')}
      />
      <TextInput
        className="mb-3"
        label="NIK"
        placeholder="NIK"
        required
        {...form.getInputProps('nik')}
      />
      <TextInput
        className="mb-3"
        label="Nomor Telepon"
        placeholder="Nomor Telepon"
        required
        {...form.getInputProps('phone')}
      />
      <TextInput className="mb-3" label="NIP" placeholder="NIP" {...form.getInputProps('nip')} />
      <TextInput
        className="mb-3"
        label="Nomor BPJS"
        placeholder="Nomor BPJS"
        {...form.getInputProps('no_bpjs')}
      />
      <Select
        className="mb-3"
        label="Jenis Kelamin"
        placeholder="Pilih Jenis Kelamin"
        data={optionSex}
        {...form.getInputProps('sex')}
      />
      <TextInput
        className="mb-3"
        label="Tempat Lahir"
        placeholder="Tempat Lahir"
        {...form.getInputProps('birth_date')}
      />
      <Select
        className="mb-3"
        label="Agama"
        placeholder="Pilih Agama"
        data={['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu']}
        {...form.getInputProps('religion')}
      />
      <TextInput className="mb-3" label="RT" placeholder="RT" {...form.getInputProps('rt')} />
      <TextInput className="mb-3" label="RW" placeholder="RW" {...form.getInputProps('rw')} />
      <TextInput
        className="mb-3"
        label="Kelurahan"
        placeholder="Kelurahan"
        {...form.getInputProps('village')}
      />
      <TextInput
        className="mb-3"
        label="Kecamatan"
        placeholder="Kecamatan"
        {...form.getInputProps('subdistrict')}
      />
      <TextInput
        className="mb-3"
        label="Kabupaten"
        placeholder="Kabupaten"
        {...form.getInputProps('district')}
      />
      <TextInput
        className="mb-3"
        label="Provinsi"
        placeholder="Provinsi"
        {...form.getInputProps('province')}
      />
      <TextInput
        className="mb-3"
        label="Kode Pos"
        placeholder="Kode Pos"
        {...form.getInputProps('postal_code')}
      />
      <div className="flex gap-3">
        <Button loading={loading} type="submit" color="blue" className="mt-5">
          Simpan
        </Button>
        <Button onClick={NavBack} type="button" color="gray" className="mt-5">
          Batal
        </Button>
      </div>
    </form>
  );
};
