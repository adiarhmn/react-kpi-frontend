import { LoginForm } from '../components';

export const Login: React.FC = () => {
  return (
    <main className="w-full mx-auto px-6 py-6 pb-14">
      <div className="flex items-center justify-center">
        <img src="/images/abude-logo.png" alt="" className="w-16" />
      </div>
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <LoginForm />
    </main>
  );
};
