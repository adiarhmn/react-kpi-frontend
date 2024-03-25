import { IconArrowBarToDown, IconArrowBarUp, IconBasket, IconListCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { MenuList } from '@/components/navigation';
import { Authorization, useAuth } from '@/features/auth';
import { OutletPick } from '@/features/outlet';
import { RecentSales } from '@/features/transaction';

export const Home: React.FC = () => {
  const { creds, getRoleText } = useAuth();

  return (
    <main>
      <section className="bg-blue-800 w-full rounded-b-xl px-5 pt-8 pb-20 relative">
        <OutletPick />

        <div className="text-white font-black text-xl">{creds?.name}</div>
        <div className="text-sm font-semibold text-white">{getRoleText()}</div>

        <div className="absolute right-5 top-5">
          <img src="/images/abude-logo.png" alt="" className="w-16" />
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full -mt-14 shadow shadow-gray-200 rounded-xl z-50 relative">
        <div className="w-full grid grid-cols-3 divide-x divide-gray-300 py-4">
          <Link to="/sale/add" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconArrowBarUp className="w-7 h-7" />
            </div>
            <div className="text-xs mt-1">Penjualan</div>
          </Link>
          <Link to="/purchase/add" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconArrowBarToDown className="w-7 h-7" />
            </div>
            <div className="text-xs mt-1">Pembelian</div>
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
              title: 'Bukti Transaksi',
              href: '/turnover',
              icon: '/images/pembelian.svg',
            },
            {
              title: 'Laporan Serah Terima',
              href: '/handover',
              icon: '/images/postor.svg',
            },
            {
              title: 'Statistik',
              href: '/transaction/summary',
              icon: '/images/report-up.svg',
            },
            {
              title: 'Kehadiran',
              href: '/development',
              icon: '/images/attendance.svg',
            },
            {
              title: 'Data Master',
              href: '/data-master',
              icon: '/images/cog.svg',
            },
            {
              title: 'Inventaris',
              href: '/inventory',
              icon: '/images/briefcase.svg',
            },
          ]}
        />
      </section>

      <Authorization role={['superadmin', 'owner']}>
        <section className="mb-6">
          <div className="px-5 flex justify-between">
            <h2 className="text-lg font-bold mb-2.5">Laporan</h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 px-5">
            <Link
              to="/transaction/summary"
              className="bg-white rounded-lg active:bg-blue-50 border border-transparent active:border-blue-400 transition shadow-md shadow-gray-300 px-3 py-2 items-center"
            >
              <div className="flex items-center justify-center p-1.5 w-7 h-7 mr-4 bg-blue-50 text-blue-600 rounded-md mb-1">
                <IconArrowBarUp />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-bold mb-1">Statistik</h3>
                <p className="text-xxs font-light text-gray-600">
                  Lihat Statistik Penjualan dan Pembelian Outlet
                </p>
              </div>
            </Link>
            <Link
              to="/purchase/summary"
              className="bg-white rounded-lg active:bg-blue-50 border border-transparent active:border-blue-400 transition shadow-md shadow-gray-300 px-3 py-2 items-center"
            >
              <div className="flex items-center justify-center p-1.5 w-7 h-7 mr-4 bg-blue-50 text-blue-600 rounded-md mb-1">
                <IconBasket />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-bold mb-1">Rekapitulasi Pembelian</h3>
                <p className="text-xxs font-light text-gray-600">
                  Lihat Rekapitulasi Pembelian Barang Outlet
                </p>
              </div>
            </Link>
          </div>
        </section>
      </Authorization>

      <section className="my-6">
        <div className="px-5 flex justify-between">
          <h2 className="text-lg font-bold mb-1">Penjualan Terakhir</h2>
        </div>
        <RecentSales />
      </section>

      <div className="flex items-center justify-center w-full pb-12">
        <img src="/images/abude-logo.png" alt="" className="w-16" />
      </div>
    </main>
  );
};
