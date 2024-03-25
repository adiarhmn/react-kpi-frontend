import { useContext } from 'react';

import { AuthContext } from '../contexts';

export const useAuth = () => {
  const context = useContext(AuthContext);

  function getRoleText() {
    switch (context.creds?.role) {
      case 'employee':
        return 'Admin Outlet';
      case 'owner':
        return 'Owner';
      case 'superadmin':
        return 'Superadmin';
      default:
        return 'Pengguna';
    }
  }

  return { ...context, getRoleText };
};
