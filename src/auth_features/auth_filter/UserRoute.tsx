import { Navigate } from 'react-router-dom';

type UserRouteProps = {
  children: React.ReactNode;
  roles: string[];
};

export const UserRoute = ({ children, roles }: UserRouteProps) => {
  const { user } = useAuth();

  if (roles.includes(user.role)) {
    return children;
  }

  return <Navigate to="/login" />;
};

// Data Dummy
const useAuth = () => {
  return {
    user: { 
      role: 'admin',
    },
  };
};
