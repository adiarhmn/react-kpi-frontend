import { Button, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconMap2, IconUser } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUpdateEmployee } from '../api/Profile';

export const BiodataEdit: React.FC = () => {
  const location = useLocation();
  const employee = location.state.biodata;

  const navigate = useNavigate();
  const formProfile = useForm({
    validateInputOnChange: true,
    initialValues: { ...employee, birth_date: new Date(employee.birth_date) },
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
        value.length < 2 ? 'Email setidaknya harus memuat lebih dari 2 karakter' : null,
      nik: (value) =>
        value.length < 2 ? 'Nomor KTP setidaknya harus memuat lebih dari 12 karakter' : null,
    },
  });

  // [SUBMIT UPDATE BIODATA]
  const mutationUpdateBiodata = useUpdateEmployee();
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const employeeData = {
      id: formProfile.values.id,
      nip: formProfile.values.nip,
      nik: formProfile.values.nik,
      no_bpjs: formProfile.values.no_bpjs,
      name: formProfile.values.name,
      email: formProfile.values.email,
      sex: formProfile.values.sex,
      birth_date: formProfile.values.birth_date,
      religion: formProfile.values.religion,
      first_degree: formProfile.values.first_degree,
      last_degree: formProfile.values.last_degree,
      last_education: formProfile.values.last_education,
      address: formProfile.values.address,
      rt: formProfile.values.rt,
      rw: formProfile.values.rw,
      village: formProfile.values.village,
      subdistrict: formProfile.values.subdistrict,
      district: formProfile.values.district,
      province: formProfile.values.province,
      postal_code: formProfile.values.postal_code,
      phone: formProfile.values.phone,
      status: formProfile.values.status,
      user_id: formProfile.values.user_id,
      division_id: formProfile.values.division_id,
    };

    await mutationUpdateBiodata.mutateAsync(employeeData, {
      onSuccess: (data) => {
        console.log('Success:', data);
        localStorage.setItem('hasNotifiedBiodata', 'no');
        navigate('/profile/biodata', {
          state: { success: 'Biodata berhasil diubah!' },
        });
        close();
      },
    });
  };
  // [END SUBMIT UPDATE BIODATA]

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
        <div className="flex justify-between text-sm items-center p-2 px-5 -mb-2">
          <span className="font-bold text-blue-700">Data diri pegawai</span>
          <IconUser className="opacity-80" size={25} />
        </div>
        <form onSubmit={handleSubmitForm}>
          <div className="mx-auto p-2 w-80 text-slate-700 px-2">
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
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('name')}
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
              {...formProfile.getInputProps('last_education')}
            />
            <TextInput
              size="xs"
              label="Gelar depan"
              name="gelarDepan"
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('first_degree')}
            />
            <TextInput
              size="xs"
              label="Gelar belakang"
              name="gelarBelakang"
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('last_degree')}
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
              {...formProfile.getInputProps('sex')}
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
            {/* <TextInput
            size="xs"
            label="Agama"
            name="agama"
            withAsterisk
            style={{
              marginTop: '5px',
            }}
            {...formProfile.getInputProps('religion')}
          /> */}
            <DateInput
              clearable
              size="xs"
              label="Tanggal lahir"
              name="tanggalLahir"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('birth_date')}
            />
            <TextInput
              size="xs"
              label="Nomor Telepon"
              name="nomorTelepon"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('phone')}
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
              {...formProfile.getInputProps('religion')}
            />
            <TextInput
              size="xs"
              label="Nomor KTP"
              name="nomorKTP"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('nik')}
            />
            <TextInput
              size="xs"
              label="Nomor BPJS"
              name="nomorBPJS"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('no_bpjs')}
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
              {...formProfile.getInputProps('province')}
            />
            <TextInput
              size="xs"
              label="Kabupaten"
              name="kabupaten"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('district')}
            />
            <TextInput
              size="xs"
              label="Kecamatan"
              name="kecamatan"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('subdistrict')}
            />
            <TextInput
              size="xs"
              label="Kelurahan"
              name="kelurahan"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('village')}
            />
            <TextInput
              size="xs"
              label="RT"
              name="rt"
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('rt')}
            />
            <TextInput
              size="xs"
              label="RW"
              name="rw"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('rw')}
            />
            <TextInput
              size="xs"
              label="Kode POS"
              name="kodePOS"
              withAsterisk
              style={{
                marginTop: '5px',
              }}
              {...formProfile.getInputProps('postal_code')}
            />
          </div>
          <Button
            type="submit"
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
        </form>
      </section>
    </main>
  );
};
