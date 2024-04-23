import { Link } from 'react-router-dom';

export const DashboardAdmin: React.FC = () => {
  return (
    <main>
      {/* Rekap Absensi Hari ini */}
      <div className="grid grid-cols-2 gap-2">
        <section className="bg-white shadow-lg p-3 rounded-lg">Rekap Absensi Hari ini</section>
        <section className="bg-white shadow-lg p-3 rounded-lg">
          <span className="font-bold">Jumlah Karyawan</span>
          <div className="grid grid-cols-3">
            <div>Total 299</div>
            <div>Pria 299</div>
            <div>Wanita 299</div>
          </div>
        </section>
      </div>
    </main>
  );
};
