import {
  IconHandStop,
  IconCalendar,
  IconReportMoney,
  IconFileTime,
  IconNews,
  IconFingerprint,
  IconChevronRight,
  IconClockHour8,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { MenuList } from '@/components/navigation';

export const Home: React.FC = () => {
  // const { creds, getRoleText } = useAuth();

  return (
    <main>
      <section className="bg-blue-700 w-full rounded-b-3xl px-5 pt-8 pb-20 relative">
        <img
          src="/images/predictive-analytics.svg"
          className="absolute w-44 right-3 -top-4 opacity-85"
          alt=""
        />
        <div className="text-white font-bold text-lg relative z-10">Adi Aulia Rahman</div>
        <div className="text-sm font-semibold text-white">Karyawan</div>

        <div className="absolute right-5 top-5">
          <img src="/images/white-logo.png" alt="" className="w-14" />
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full -mt-14 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="divide-y divide-gray-300">
          <div className="flex justify-between text-xs items-center p-2">
            <span className="font-bold text-blue-700">Rekap Absensi Bulan ini</span>
            <IconChevronRight className="opacity-80" size={20} />
          </div>
          <div className="w-full grid grid-cols-3 divide-x divide-gray-300 pb-2 pt-2">
            <Link to="/sale/add" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-green-500 text-white rounded-xl font-bold w-10 h-10 text-center shadow">
                23
              </div>
              <div className="text-xs mt-1">Hadir</div>
            </Link>
            <Link to="/purchase/add" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-yellow-500 text-white rounded-xl font-bold w-10 h-10 text-center shadow">
                7
              </div>
              <div className="text-xs mt-1">Izin</div>
            </Link>
            <Link to="/expense" className="px-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-sky-400 text-white rounded-xl font-bold w-10 h-10 text-center shadow">
                7
              </div>
              <div className="text-xs mt-1 t">Sisa Cuti</div>
            </Link>
          </div>
          <div className="grid grid-cols-2 text-xs divide-x divide-gray-300 p-2">
            <div className="flex gap-2">
              <IconClockHour8 size={15} className="text-green-400" /> Masuk : 08.00
            </div>
            <div className="ps-3 flex gap-2">
              <IconClockHour8 size={15} className="text-rose-400" /> Keluar : 00.00
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 mt-8 mb-6">
        <MenuList
          navigations={[
            {
              title: 'Kehadiran',
              href: '/development',
              icon: IconFingerprint,
              color: 'bg-blue-600',
            },
            {
              title: 'Izin',
              href: '/development',
              icon: IconFileTime,
              color: 'bg-blue-600',
            },
            {
              title: 'Schedule',
              href: '/development',
              icon: IconCalendar,
              color: 'bg-blue-600',
            },
            {
              title: 'Slip Gaji',
              href: '/development',
              icon: IconReportMoney,
              color: 'bg-blue-600',
            },
            {
              title: 'Berita',
              href: '/development',
              icon: IconNews,
              color: 'bg-blue-600',
            },
          ]}
        />
      </section>
    </main>
  );
};
