import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SessionCreateType, useUpdateSession } from '../../api';
import { FormSession } from '../../components';

export const UpdateSession: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = location.state?.session || undefined;
  if (!session) navigate(-1);

  const createSession = useUpdateSession();

  const handleSubmit = (data: SessionCreateType) => {
    createSession.mutateAsync(data, {
      onSuccess() {
        navigate(-1);
        // Set interval
        setTimeout(() => {
          notifications.show({
            title: 'Berhasil',
            message: 'Sesi berhasil ditambahkan',
            color: 'teal',
          });
        }, 500);
      },
    });
  };
  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-start">
          <ActionIcon onClick={() => navigate(-1)} color="blue" className="mt-1">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <div className="flex gap-3 items-center">
              <h2 className="font-bold">Tambah Sesi</h2>
            </div>
            <div className="-mt-1 text-xs text-slate-400">Berikut form untuk menambahkan Sesi</div>
          </div>
        </div>
        <div className="mt-5">
          <FormSession onsubmit={handleSubmit} initialValues={session} />
        </div>
      </section>
    </main>
  );
};
