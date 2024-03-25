import { Link } from 'react-router-dom';

export const DataMaster: React.FC = () => {
  return (
    <main className="py-6">
      <section className="px-5">
        <div className="mb-4">
          <h1 className="font-bold text-base">Data Master</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link
            to="/product"
            className="bg-white rounded-md border border-gray-100 shadow-lg shadow-gray-200 p-4 active:bg-blue-50 active:border-blue-400"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8">
                <img src="/images/barang.svg" alt="" />
              </div>

              <div className="pl-4">
                <h2 className="font-bold text-base">Data Barang</h2>
              </div>
            </div>
          </Link>
          <Link
            to="/supplier"
            className="bg-white rounded-md border border-gray-100 shadow-lg shadow-gray-200 p-4 active:bg-blue-50 active:border-blue-400"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8">
                <img src="/images/briefcase.svg" alt="" />
              </div>

              <div className="pl-4">
                <h2 className="font-bold text-base">Data Supplier</h2>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};
