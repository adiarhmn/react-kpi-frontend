import { useContext } from 'react';

import { AuthContext } from '../contexts';

export const useAuth = () => {
  const context = useContext(AuthContext);

  function getRoleText() {
    switch (context.creds?.role) {
      case 'employee':
        return 'employee';
      case 'superadmin':
        return 'superadmin';
      case 'admin':
        return 'admin';
      case 'supervisor':
        return 'supervisor';
      default:
        return 'employee';
    }
  }

  return { ...context, getRoleText };
};
