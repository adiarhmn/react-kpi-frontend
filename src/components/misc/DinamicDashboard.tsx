import { DashboardAdmin } from '@/admin_features/misc';
import { useAuth } from '@/features/auth';
import { DashboardSuperadmin } from '@/superadmin/misc';

export const DinamicDashboard: React.FC = () => {
  const { creds } = useAuth();
  const ID_COMPANY = localStorage.getItem('id_company');
  return (
    <>
      {creds?.role === 'superadmin' && !ID_COMPANY ? <DashboardSuperadmin /> : <DashboardAdmin />}
    </>
  );
};
