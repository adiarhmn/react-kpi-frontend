import { Button, FileButton, Group, Select, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconDeviceFloppy, IconMap2, IconUser } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateEmployee } from '../api/Profile';
import { useRef, useState } from 'react';

export const BiodataEdit: React.FC = () => {
  const location = useLocation();
  const employee = location.state.biodata;

  const navigate = useNavigate();
  const formProfile = useForm({
    validateInputOnChange: true,
    initialValues: {
      ...employee,
      birth_date: new Date(employee.birth_date),
      image: null as File | null,
    },
    validate: {
      nip: (value) =>
        value.length < 5 ? 'nomor pegawai setidaknya harus memuat lebih dari 2 karakter' : null,
      name: (value) =>
        value.length < 2 ? 'Nama sekolah setidaknya harus memuat lebih dari 4 karakter' : null,
      last_education: (value) =>
        value.length < 2 ? 'Pendidikan setidaknya harus memuat lebih dari 2 karakter' : null,
      first_degree: (value) =>
        value.length < 2 ? 'Tempat lahir setidaknya harus memuat lebih dari 2 karakter' : null,
      phone: (value) =>
        value.length < 2 ? 'Nomor telepon setidaknya harus memuat lebih dari 2 karakter' : null,
      religion: (value) =>
        value.length < 2 ? 'Agama setidaknya harus memuat lebih dari 2 karakter' : null,
      nik: (value) =>
        value.length < 2 ? 'Nomor KTP setidaknya harus memuat lebih dari 12 karakter' : null,
    },
  });

  const mutationUpdateBiodata = useUpdateEmployee();
  const handleSubmitForm = async (values: typeof formProfile.values) => {
    const employeeData = {
      id: values.id,
      nip: values.nip,
      nik: values.nik,
      no_bpjs: values.no_bpjs,
      name: values.name,
      email: values.email,
      sex: values.sex,
      birth_date: values.birth_date,
      religion: values.religion,
      first_degree: values.first_degree,
      last_degree: values.last_degree,
      last_education: values.last_education,
      address: values.address,
      rt: values.rt,
      rw: values.rw,
      village: values.village,
      subdistrict: values.subdistrict,
      district: values.district,
      province: values.province,
      postal_code: values.postal_code,
      phone: values.phone,
      status: values.status,
      user_id: values.user_id,
      division_id: values.division_id,
      image: values.image,
    };

    await mutationUpdateBiodata.mutateAsync(employeeData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        localStorage.setItem('hasNotifiedBiodata', 'no');
        navigate('/profile/biodata', {
          state: { success: 'Biodata berhasil diubah!' },
        });
      },
    });
  };

  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    formProfile.setFieldValue('image', null);
    resetRef.current?.();
  };

  return (
    <main className="bg-white pb-4">
      <form onSubmit={formProfile.onSubmit(handleSubmitForm)}>
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
              <h2 className="font-semibold ">Data diri</h2>
            </div>
            <div>
              <Button className="shadow-sm me-1" size="xs" type="submit">
                <IconDeviceFloppy size={18} />
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-lg rounded-lg flex flex-col mt-2">
          <div className="flex justify-between items-center text-blue-700">
            <div className="flex items-center">
              <Text fw={700} c="blue">
                Foto profil
              </Text>
            </div>
            <IconUser className="opacity-80" size={25} />
          </div>
          <div className="w-full text-center mx-auto p-2 w-80 text-slate-700 px-2">
            <div className="flex">
              <div>
                <div className="h-28 w-28 bg-slate-500 text-white rounded-full">
                  {formProfile.values.image ? (
                    <img
                      src={URL.createObjectURL(formProfile.values.image)}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
              </div>
              <div className="my-auto">
                <Group justify="center">
                  <FileButton
                    resetRef={resetRef}
                    onChange={(file) => formProfile.setFieldValue('image', file)}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => <Button {...props}>Pilih foto</Button>}
                  </FileButton>
                  <Button
                    className="-mt-2"
                    disabled={!formProfile.values.image}
                    color="red"
                    onClick={clearFile}
                  >
                    Reset
                  </Button>
                </Group>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-lg rounded-lg flex flex-col mt-2 ">
          <div className="flex justify-between items-center text-blue-700">
            <div className="flex items-center">
              <Text fw={700} c="blue">
                Data diri
              </Text>
            </div>
            <IconUser className="opacity-80" size={25} />
          </div>
          <div>
            <div className="w-full mx-auto p-2 w-80 text-slate-700 px-2">
              <TextInput
                size="xs"
                label="Nomor Pegawai"
                name="nomorPegawai"
                withAsterisk
                {...formProfile.getInputProps('nip')}
              />
              <TextInput
                size="xs"
                label="Nama lengkap"
                name="namaLengkap"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('name')}
              />
              <Select
                size="xs"
                label="Pendidikan terakhir"
                name="pendidikanTerakhir"
                withAsterisk
                style={{ marginTop: '5px' }}
                data={['SD', 'SMP', 'SMA/SMK', 'D3', 'D4', 'S1', 'S2', 'S3']}
                {...formProfile.getInputProps('last_education')}
              />
              <TextInput
                size="xs"
                label="Gelar depan"
                name="gelarDepan"
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('first_degree')}
              />
              <TextInput
                size="xs"
                label="Gelar belakang"
                name="gelarBelakang"
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('last_degree')}
              />
              <Select
                size="xs"
                label="Jenis kelamin"
                name="jenisKelamin"
                withAsterisk
                style={{ marginTop: '5px' }}
                data={['Laki - laki', 'Perempuan']}
                {...formProfile.getInputProps('sex')}
              />
              <Select
                size="xs"
                label="Golongan darah"
                name="golDarah"
                withAsterisk
                style={{ marginTop: '5px' }}
                data={['A', 'AB', 'O', 'B']}
                {...formProfile.getInputProps('golDarah')}
              />
              <DateInput
                clearable
                size="xs"
                label="Tanggal lahir"
                name="tanggalLahir"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('birth_date')}
              />
              <TextInput
                size="xs"
                label="Nomor Telepon"
                name="nomorTelepon"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('phone')}
              />
              <TextInput
                size="xs"
                label="Email"
                name="email"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('email')}
              />
              <Select
                size="xs"
                label="Agama"
                name="agama"
                withAsterisk
                style={{ marginTop: '5px' }}
                data={['Islam', 'Kristen', 'Hindu', 'Budha', 'Katolik', 'Khonghucu']}
                {...formProfile.getInputProps('religion')}
              />
              <TextInput
                size="xs"
                label="Nomor KTP"
                name="nomorKTP"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('nik')}
              />
              <TextInput
                size="xs"
                label="Nomor BPJS"
                name="nomorBPJS"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('no_bpjs')}
              />
            </div>
          </div>
        </section>
        <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-lg rounded-lg flex flex-col mt-2 mb-4">
          <div className="flex justify-between items-center text-blue-700">
            <div className="flex items-center">
              <Text fw={700} c="blue">
                Data alamat
              </Text>
            </div>
            <IconMap2 className="opacity-80" size={25} />
          </div>
          <div>
            <div className="w-full mx-auto p-2 w-80 text-slate-700 px-2">
              <TextInput
                size="xs"
                label="Provinsi"
                name="provinsi"
                withAsterisk
                {...formProfile.getInputProps('province')}
              />
              <TextInput
                size="xs"
                label="Kabupaten"
                name="kabupaten"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('district')}
              />
              <TextInput
                size="xs"
                label="Kecamatan"
                name="kecamatan"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('subdistrict')}
              />
              <TextInput
                size="xs"
                label="Kelurahan"
                name="kelurahan"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('village')}
              />
              <TextInput
                size="xs"
                label="RT"
                name="rt"
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('rt')}
              />
              <TextInput
                size="xs"
                label="RW"
                name="rw"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('rw')}
              />
              <TextInput
                size="xs"
                label="Kode POS"
                name="kodePOS"
                withAsterisk
                style={{ marginTop: '5px' }}
                {...formProfile.getInputProps('postal_code')}
              />
            </div>
          </div>
        </section>
      </form>
    </main>
  );
};
