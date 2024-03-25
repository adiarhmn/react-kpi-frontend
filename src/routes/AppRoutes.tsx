import { Route, Routes } from 'react-router-dom';

import { HomeLayout, AuthLayout, AppLayout, PlainLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { DataMaster } = lazyImport(() => import('@/features/misc'), 'DataMaster');
const { Profile } = lazyImport(() => import('@/features/employee'), 'Profile');

const { Attendances } = lazyImport(() => import('@/features/employee'), 'Attendances');


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="data-master" element={<DataMaster />} />

        </Route>

    

        <Route path="attendance" element={<Attendances />} />


        <Route path="development" element={<Development />} />
      </Route>



      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
