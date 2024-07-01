import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import { AttendanceListSection } from '@/features/history';

import { useGetEmployee } from '../api';

export const DetailEmployee: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: DataEmployee, isLoading: LoadEmployee } = useGetEmployee(parseInt(id ?? ''));

  if (LoadEmployee) return <div>Loading...</div>;

  console.log(DataEmployee);

  return (
    <>
      <section className="bg-white rounded-lg  shadow-lg p-5">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={() => navigate(-1)} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Detail Karyawan : Adi Aulia Rahman</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut Detail Data Karyawan</div>
          </div>
        </div>
      </section>

      {/* Data Karyawan */}
      <section className="bg-white rounded-lg  shadow-lg p-5 mt-4">
        <div>
          <h2 className="font-bold">Data Adi Aulia Rahman</h2>
          <div className="-mt-1 text-xs text-slate-400">Berikut Detail Data Karyawan</div>
        </div>
        <table className="mt-5  text-xs">
          <tbody>
            {/* Nama Pegawai */}
            <tr>
              <td>Nama</td>
              <td className="min-w-10 text-center">:</td>
              <td>Adi Aulia Rahman</td>
            </tr>

            {/* NIP Pegawai */}
            <tr>
              <td>NIP</td>
              <td className="min-w-10 text-center">:</td>
              <td>09128128127</td>
            </tr>

            {/* Pendidikan Terakhir */}
            <tr>
              <td>Pendidikan Terakhir</td>
              <td className="min-w-10 text-center">:</td>
              <td>S1 Teknik Informatika</td>
            </tr>

            {/* NO Whatsapp */}
            <tr>
              <td>No Whatsapp</td>
              <td className="min-w-10 text-center">:</td>
              <td>081234567890</td>
            </tr>

            {/* Agama */}
            <tr>
              <td>Agama</td>
              <td className="min-w-10 text-center">:</td>
              <td>Islam</td>
            </tr>

            {/* Alamat */}
            <tr>
              <td>Alamat</td>
              <td className="min-w-10 text-center">:</td>
              <td>Jl. Jalan No. 1</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Data Presensi */}
      <section className="flex mt-2 gap-3">
        <div className="max-w-xs">
          <div className="max-w-xs bg-white p-5 shadow-lg rounded-lg mt-2">
            <h2 className="font-bold text-sm">Riwayat Presensi</h2>
            <div className="-mt-1 text-xs text-slate-400">Berikut Riwayat Presensi Karyawan</div>
          </div>
          <AttendanceListSection employee_id={parseInt(id ?? '0')} with_activity={false} />
        </div>
        <div className="bg-white rounded-lg shadow-lg mt-2 p-5 flex-grow">askdjhas</div>
      </section>
    </>
  );
};
