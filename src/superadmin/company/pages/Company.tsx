import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateCompany } from '../api';
import { TableCompany } from '../components';

export const Company: React.FC = () => {
  const [successInsert, setSuccessInsert] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const mutationCreateCompany = useCreateCompany();

  const form = useForm({
    initialValues: {
      name: '',
      shift_active: '1',
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: form.values.name,
      shift_active: form.values.shift_active === '1',
    };
    try {
      await mutationCreateCompany.mutateAsync(data, {
        onSuccess: () => {
          form.reset();
          close();
          notifications.show({
            title: 'Company berhasil ditambahkan',
            message: 'Company berhasil ditambahkan',
            color: 'teal',
          });
          setSuccessInsert(!successInsert);
        },
        onError: (error) => {
          console.error(error);
          notifications.show({
            title: 'Gagal menambahkan Company',
            message: error.message,
            color: 'red',
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      {/* Menampilkan Data Divisi */}
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Company</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar company yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={open} leftSection={<IconPlus size={16} />}>
            Tambah Company
          </Button>
        </div>
        <div className="mt-7">
          <TableCompany successInsert={successInsert} />
        </div>
      </section>

      <Modal opened={opened} onClose={close} title="Tambah Company">
        <form onSubmit={handleSubmit}>
          <TextInput
            className="mb-3"
            label="Nama Company"
            placeholder="Nama Company"
            required
            {...form.getInputProps('name')}
          />

          <Select
            label="Status Fitur Shift"
            placeholder="Pilih"
            required
            defaultValue={form.values.shift_active}
            data={[
              { value: '1', label: 'Aktif' },
              { value: '0', label: 'Tidak Aktif' },
            ]}
            {...form.getInputProps('shift_active')}
          />

          <div className="flex gap-3">
            <Button type="submit" color="blue" className="mt-5">
              Simpan
            </Button>
            <Button
              onClick={() => {
                close();
              }}
              type="button"
              color="gray"
              className="mt-5"
            >
              Batal
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};
