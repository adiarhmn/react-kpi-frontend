import { IconArrowBarToDown, IconArrowBarUp, IconBasket, IconListCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { MenuList } from '@/components/navigation';
import { Authorization, useAuth } from '@/features/auth';

export const Home: React.FC = () => {
  // const { creds, getRoleText } = useAuth();

  return (
    <main>
      <section className="bg-blue-500 w-full rounded-b-xl px-5 pt-8 pb-20 relative">
        <div className="text-white font-black text-xl">Adi Aulia Rahman</div>
        <div className="text-sm font-semibold text-white">Pengguna</div>

        <div className="absolute right-5 top-5">
          <img src="/images/kpi-logo.png" alt="" className="w-14" />
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full -mt-14 shadow shadow-gray-200 rounded-xl z-50 relative p-2 px-2">
        <div className="text-xs font-semibold ps-1 pb-2">Rekap absensi bulan ini</div>
        <div className="w-full grid grid-cols-3 divide-x divide-gray-300 pb-2">
          <Link to="/sale/add" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-green-100 text-green-600 rounded-xl font-bold w-10 h-10 text-center">
              23
            </div>
            <div className="text-xs mt-1">Hadir</div>
          </Link>
          <Link to="/purchase/add" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl font-bold w-10 h-10 text-center">
              7
            </div>
            <div className="text-xs mt-1">Izin</div>
          </Link>
          <Link to="/expense" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconListCheck className="w-7 h-7" />
            </div>
            <div className="text-xs mt-1">Pengeluaran</div>
          </Link>
        </div>
      </section>

      <section className="px-5 mt-8 mb-6">
        <MenuList
          navigations={[
            {
              title: 'Kehadiran',
              href: '/development',
              icon: '/images/attendance.svg',
            },
          ]}
        />
      </section>
    </main>
  );
};
