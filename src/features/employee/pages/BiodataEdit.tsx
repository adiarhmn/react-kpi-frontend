import { Button, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconMap2, IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmployeeType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetEmployee } from '../api/Profile';

export const BiodataEdit: React.FC = () => {
  const { creds } = useAuth();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data } = useGetEmployee(creds?.employee_id);
  useEffect(() => {
    if (data) {
      setEmployee(data);
    }
  }, [data]);

  const navigate = useNavigate();
  const formProfile = useForm({
    validateInputOnChange: true,
    initialValues: {
      // nomorPegawai: employee?.nip,
      // namaLengkap: employee?.name,
      // pendidikanTerakhir: '',
      // gelarDepan: employee?.first_degree,
      // gelarBelakang: employee?.last_degree,
      // jenisKelamin: employee?.sex,
      // golDarah: '',
      // tempatLahir: '',
      // tanggalLahir: employee?.birth_date,
      // nomorTelepon: employee?.phone,
      // email: employee?.email,
      // agama: employee?.religion,
      // nomorKTP: employee?.nik,
      // nomorBPJS: employee?.no_bpjs,
      nomorPegawai: '',
      namaLengkap: '',
      pendidikanTerakhir: '',
      gelarDepan: '',
      gelarBelakang: '',
      jenisKelamin: '',
      golDarah: '',
      tempatLahir: '',
      tanggalLahir: '',
      nomorTelepon: '',
      email: '',
      agama: '',
      nomorKTP: '',
      nomorBPJS: '',
    },
    validate: {
      nomorPegawai: (value) =>
        value.length < 5 ? 'nomor pegawai setidaknya harus memuat lebih dari 2 karakter' : null,
      namaLengkap: (value) =>
        value.length < 2 ? 'Nama sekolah setidaknya harus memuat lebih dari 4 karakter' : null,
      pendidikanTerakhir: (value) =>
        value.length < 2 ? 'Pendidikan setidaknya harus memuat lebih dari 2 karakter' : null,
      tempatLahir: (value) =>
        value.length < 2 ? 'Tempat lahir setidaknya harus memuat lebih dari 2 karakter' : null,
      nomorTelepon: (value) =>
        value.length < 2 ? 'Nomor telepon setidaknya harus memuat lebih dari 2 karakter' : null,
      email: (value) =>
        value.length < 2 ? 'Email setidaknya harus memuat lebih dari 2 karakter' : null,
      nomorKTP: (value) =>
        value.length < 2 ? 'Nomor KTP setidaknya harus memuat lebih dari 12 karakter' : null,
    },
  });

  const formAddress = useForm({
    validateInputOnChange: true,
    initialValues: {
      provinsi: '',
      kabupaten: '',
      kecamatan: '',
      kelurahan: '',
      rt: '',
      rw: '',
      kodePos: '',
    },
    validate: {
      provinsi: (value) =>
        value.length < 5 ? 'nomor pegawai setidaknya harus memuat lebih dari 2 karakter' : null,
      kabupaten: (value) =>
        value.length < 2 ? 'Nama sekolah setidaknya harus memuat lebih dari 4 karakter' : null,
      kecamatan: (value) =>
        value.length < 2 ? 'Pendidikan setidaknya harus memuat lebih dari 2 karakter' : null,
      kelurahan: (value) =>
        value.length < 2 ? 'Tempat lahir setidaknya harus memuat lebih dari 2 karakter' : null,
      rt: (value) =>
        value.length < 2 ? 'Nomor telepon setidaknya harus memuat lebih dari 2 karakter' : null,
      rw: (value) =>
        value.length < 2 ? 'Email setidaknya harus memuat lebih dari 2 karakter' : null,
      kodePos: (value) =>
        value.length < 2 ? 'Nomor KTP setidaknya harus memuat lebih dari 12 karakter' : null,
    },
  });

  return (
    <main className="bg-white">
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
            <h2 className="font-semibold ">Edit data pegawai</h2>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-sm w-full relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-sm items-center p-2">
          <span className="font-bold text-blue-700">Data diri pegawai</span>
          <IconUser className="opacity-80" size={25} />
        </div>
        <div className="mx-auto p-2 w-80 text-slate-700 px-2">
          <TextInput
            size="xs"
            label="Nomor Pegawai"
            name="nomorPegawai"
            withAsterisk
            {...formProfile.getInputProps('nomorPegawai')}
          />
          <TextInput
            size="xs"
            label="Nama lengkap"
            name="namaLengkap"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('namaLengkap')}
          />
          <Select
            size="xs"
            label="Pendidikan terakhir"
            name="pendidikanTerakhir"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            data={['SD', 'SMP', 'SMA/SMK', 'D3', 'D4', 'S1', 'S2', 'S3']}
            {...formProfile.getInputProps('pendidikanTerakhir')}
          />
          <TextInput
            size="xs"
            label="Gelar depan"
            name="gelarDepan"
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('gelarDepan')}
          />
          <TextInput
            size="xs"
            label="Gelar belakang"
            name="gelarBelakang"
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('gelarBelakang')}
          />
          <Select
            size="xs"
            label="Jenis kelamin"
            name="jenisKelamin"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            data={['Laki - laki', 'Perempuan']}
            {...formProfile.getInputProps('jenisKelamin')}
          />
          <Select
            size="xs"
            label="Golongan darah"
            name="golDarah"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            data={['A', 'AB', 'O', 'B']}
            {...formProfile.getInputProps('golDarah')}
          />
          <TextInput
            size="xs"
            label="Tempat lahir"
            name="tempatLahir"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('temparLahir')}
          />
          <DateInput
            clearable
            size="xs"
            label="Tanggal lahir"
            name="tanggalLahir"
            // defaultValue={'tanggalLahir'}
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('tanggalLahir')}
          />
          <TextInput
            size="xs"
            label="Nomor Telepon"
            name="nomorTelepon"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('nomorTelepon')}
          />
          <TextInput
            size="xs"
            label="Email"
            name="email"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('email')}
          />
          <Select
            size="xs"
            label="Agama"
            name="agama"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            data={['Islam', 'Kristen', 'Hindu', 'Budha', 'Katolik', 'Khonghucu']}
            {...formProfile.getInputProps('agama')}
          />
          <TextInput
            size="xs"
            label="Nomor KTP"
            name="nomorKTP"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('nomorKTP')}
          />
          <TextInput
            size="xs"
            label="Nomor BPJS"
            name="nomorBPJS"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('nomorBPJS')}
          />
        </div>
        <div className="flex justify-between text-sm items-center p-2">
          <span className="font-bold text-blue-700">Data alamat pegawai</span>
          <IconMap2 className="opacity-80" size={25} />
        </div>
        <div className="mx-auto p-2 w-80 text-slate-700 px-2">
          <TextInput
            size="xs"
            label="Provinsi"
            name="provinsi"
            withAsterisk
            {...formAddress.getInputProps('provinsi')}
          />
          <TextInput
            size="xs"
            label="Kabupaten"
            name="kabupaten"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formAddress.getInputProps('kabupaten')}
          />
          <TextInput
            size="xs"
            label="Kecamatan"
            name="kecamatan"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formAddress.getInputProps('kecamatan')}
          />
          <TextInput
            size="xs"
            label="Kelurahan"
            name="kelurahan"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formAddress.getInputProps('kelurahan')}
          />
          <TextInput
            size="xs"
            label="RT"
            name="rt"
            style={{
              marginTop: '5px',
            }}
            {...formAddress.getInputProps('rt')}
          />
          <TextInput
            size="xs"
            label="RW"
            name="rw"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formAddress.getInputProps('rw')}
          />
          <TextInput
            size="xs"
            label="Kode POS"
            name="kodePOS"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formAddress.getInputProps('kodePOS')}
          />
        </div>
        <Button
          fullWidth
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            borderRadius: '10px',
            width: '90%',
            marginLeft: '18px',
          }}
        >
          Simpan perubahan
        </Button>
      </section>
    </main>
  );
};
