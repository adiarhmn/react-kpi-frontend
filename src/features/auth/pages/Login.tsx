import { LoginForm } from '../components';

export const Login: React.FC = () => {
  return (
    <main className="w-full mx-auto px-8 py-6 lg:px-12 pb-14">
      <div className="flex items-center justify-center mb-24 mt-9">
        <img src="/images/kpi-logo.png" alt="" className="w-20" />
      </div>
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="text-xs mb-7">Welcome back, please enter your account</p>

      <LoginForm />
    </main>
  );
};
