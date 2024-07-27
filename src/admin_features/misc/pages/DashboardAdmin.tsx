/* eslint-disable linebreak-style */
import { Badge, Button, Divider, Indicator, Select, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconDashboard, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetRecap } from '@/admin_features/attendance/api';
import { useAuth } from '@/features/auth';

import {
  AllEmployeeCard,
  AttendanceCard,
  FemaleEmployeeCard,
  MaleEmployeeCard,
  RequestCard,
} from '../components';

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate('/login');
  // About Date
  const month = new Date();

  // Data Recap
  const { data: DataRecap, isLoading: LoadingRecap } = useGetRecap(
    creds?.company_id,
    month.getMonth() + 1,
    month.getFullYear()
  );

  const [typeRequest, setTypeRequest] = useState<string>('Izin');

  const OptionRequest = [
    { value: 'Cuti', label: 'Cuti' },
    { value: 'Izin', label: 'Izin' },
    { value: 'Sakit', label: 'Sakit' },
    { value: 'Lembur', label: 'Lembur' },
    { value: 'Absensi', label: 'Absensi' },
  ];

  if (LoadingRecap) return <div>Loading...</div>;

  const getTotal = (Data: any) => {
    let total = 0;
    Data?.forEach((element: any) => {
      if (element?.recap?.length === 0) {
        total += 1;
      }
    });

    return total;
  };

  const getMinus = (total: number, total2: number) => {
    return total - total2;
  };
  return (
    <main>
      {/* Rekap Absensi Hari ini */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recap Attendance Card */}
        <div className="flex flex-col gap-6">
          <AttendanceCard />

          <section className="bg-white shadow-lg p-6 rounded-lg">
            <div className="grid lg:grid-cols-2">
              <div>
                <h2 className="font-bold">Daftar Pengajuan</h2>
                <div className="-mt-1 text-xs text-slate-400">
                  Berikut pengajuan yang perlu di proses
                </div>
              </div>
              <Select
                className="mt-2 lg:mt-0 w-full"
                placeholder="Pilih Pengajuan"
                data={OptionRequest}
                defaultValue="Izin"
                onChange={(e) => setTypeRequest(e ?? 'Izin')}
              />
            </div>
            <div className="mt-3">
              <RequestCard typeRequest={typeRequest}></RequestCard>
            </div>
          </section>
        </div>

        {/* Data MASTER SECTION */}
        <div>
          <div className="mb-2 bg-white shadow-lg px-6 py-3 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="font-bold">Data Master Perusahaan</h2>
              <div className="-mt-1 text-xs text-slate-400 flex gap-2">
                Panduan terkait Data Master
                <UnstyledButton onClick={() => navigate('/tutorial')}>
                  <Badge
                    color="yellow"
                    size="sm"
                    leftSection={<IconInfoCircle size={15} />}
                    variant="light"
                  >
                    Lihat Panduan Aplikasi
                  </Badge>
                </UnstyledButton>
              </div>
            </div>

            <Button
              leftSection={<IconDashboard size={19} />}
              rightSection={<IconChevronRight size={15} />}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'pink', deg: 90 }}
              onClick={() => navigate('/division')}
            >
              Data Master
            </Button>
          </div>

          <section className="bg-white shadow-lg p-6 rounded-lg">
            {/* Data Karyawan */}
            <div className="mb-2">
              <div className="mb-3">
                <h2 className="font-bold text-sm text-slate-500">Data Karyawan</h2>
                <div className="-mt-1 text-xs text-slate-400">
                  Berikut jumlah karyawan yang terdaftar
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
                <AllEmployeeCard></AllEmployeeCard>
                <MaleEmployeeCard></MaleEmployeeCard>
                <FemaleEmployeeCard></FemaleEmployeeCard>
              </div>
            </div>

            <Divider my={30} />

            {/* Data Master Perusahaan */}
            <div className="mb-2">
              <div className="mb-3">
                <h2 className="font-bold text-sm text-slate-500">Jadwal Karyawan Bulan Ini</h2>
                <div className="-mt-1 text-xs text-slate-400">
                  Berikut jumlah karyawan yang terdaftar
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
                <div className="bg-slate-100 text-green-600 px-5 rounded-md shadow text-sm py-1 flex justify-around items-center">
                  <span className="font-bold">
                    {getMinus(DataRecap?.length ?? 0, getTotal(DataRecap))}
                  </span>
                  <span className="text-xs">Karyawan Sudah Memiliki Jadwal</span>
                </div>
                <Indicator inline processing color="red" size={12}>
                  <div className="bg-slate-100 px-5 rounded-md shadow text-sm py-1 flex justify-around text-red-400">
                    <span className="font-bold">{getTotal(DataRecap)}</span>
                    <span className="text-xs">Karyawan Belum Memiliki Jadwal</span>
                  </div>
                </Indicator>
              </div>
              <Button
                fullWidth
                className="mt-5"
                rightSection={<IconChevronRight size={15} />}
                onClick={() => navigate('/schedule')}
                justify="space-between"
              >
                Atur Jadwal Karyawan
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
