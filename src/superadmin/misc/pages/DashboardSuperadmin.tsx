import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { useCreateCompany, useGetCompanys } from '@/superadmin/company';
import { FormCompany } from '@/superadmin/company/components';

export const DashboardSuperadmin: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (creds === null) navigate('/login');

  // Create Company
  const MutationCreate = useCreateCompany();
  const [opened, { open, close }] = useDisclosure(false);
  const handleCreate = async (data: any) => {
    MutationCreate.mutate(data, {
      onSuccess(data) {
        console.log('Success Create Company', data);
      },
    });
  };

  // Get Data Companys
  const { data: CompanyList, isLoading: LoadCompany } = useGetCompanys();
  // Loading Get Data Companys
  if (LoadCompany) return <div>Loading...</div>;

  console.log(CompanyList);
  // RENDER COMPONENT =====================================================
  return (
    <main>
      {/* Dashboard Superadmin */}
      <section className="m-3 mx-7 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="font-semibold text-xl">
          Selamat Datang <span className="text-blue-600 font-semibold">Superadmin,</span>
        </h1>
      </section>

      {/* Daftar atau List Daftar Company */}
      <section className="m-3 mt-5 mx-7 p-6 bg-white rounded-lg shadow-lg">
        <div id="Header-List-Company" className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Daftar Company atau Perusahaan</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar Company atau Perusahaan yang terdaftar
            </div>
          </div>

          <Button onClick={open} leftSection={<IconPlus size={18} />}>
            Tambah Company Baru
          </Button>
        </div>
        <div id="listCompany" className="grid grid-cols-4 mt-5">
          <div className="border-2 border-blue-600 p-3 rounded-lg ">
            <div className="bg-blue-600 rounded-lg px-2">1</div>
            Tarkiz
          </div>
        </div>
      </section>

      {/* Form Company */}
      <FormCompany
        onSubmit={handleCreate}
        onClose={close}
        loading={MutationCreate.isPending}
        opened={opened}
      />
    </main>
  );
};
