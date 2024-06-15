import { DashboardAdmin } from '@/admin_features/misc';
import { useAuth } from '@/features/auth';
import { DashboardSuperadmin } from '@/superadmin/misc';

export const DinamicDashboard: React.FC = () => {
  const { creds } = useAuth();
  return <>{creds?.role === 'superadmin' ? <DashboardSuperadmin /> : <DashboardAdmin />}</>;
};
