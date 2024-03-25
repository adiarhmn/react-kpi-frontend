import { IconChevronRight, IconLogout, IconSettings, IconUser } from '@tabler/icons-react';

import { useAuth } from '@/features/auth';

export const Profile: React.FC = () => {
  const { creds, getRoleText, logout } = useAuth();

  return (
    <main className="py-12">
      <section className="flex flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-900 rounded-full p-7 mb-4">
          <IconUser className="w-16 h-16" />
        </div>
        <div className="font-bold text-lg">{creds?.name}</div>
        <div className="text-sm text-gray-600">{getRoleText()}</div>
      </section>

      <section className="w-full mt-8 px-5">
        <button className="bg-transparent text-left flex w-full items-center py-2">
          <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
            <IconSettings className="w-6 h-6" />
          </div>
          <div className="font-bold px-4 flex-grow">Settings</div>
          <div className="rounded-lg">
            <IconChevronRight className="w-6 h-6" />
          </div>
        </button>
        <button
          onClick={() => logout()}
          className="bg-transparent text-left flex w-full items-center py-2"
        >
          <div className="bg-red-50 text-red-600 rounded-lg p-2">
            <IconLogout className="w-6 h-6" />
          </div>
          <div className="font-bold px-4 flex-grow">Logout</div>
          <div className="rounded-lg">
            <IconChevronRight className="w-6 h-6" />
          </div>
        </button>
      </section>
    </main>
  );
};
