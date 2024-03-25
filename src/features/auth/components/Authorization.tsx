import { useAuth } from '../hooks';
import { Creds } from '../types';

type Props = {
  role: Creds['role'][];
  children: React.ReactNode;
};

export const Authorization: React.FC<Props> = ({ role, children }) => {
  const { creds } = useAuth();

  if (!role.includes(creds?.role ?? 'owner')) return null;

  return <>{children}</>;
};
