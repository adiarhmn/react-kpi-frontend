import { ActionIcon, Button, Select, TextInput } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BaseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');

  const navigate = useNavigate();
  const NavBack = () => {
    navigate(-1);
  };

  // Fungsi Submit form data user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      username,
      password,
      role,
      status: true,
    };

    try {
      const response = await axios.post(`${BaseURL}/user`, userData);
      if (response.data.status == 201) return navigate('/users');
    } catch (error) {
    }
  };

  return (
    <main>
      <section className="bg-white p-5 rounded-lg">
        <div className="flex gap-3 items-center">
          <ActionIcon onClick={NavBack} color="blue">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <div>
            <h2 className="font-bold">Tambah User</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut form untuk menambahkan user atau pengguna baru
            </div>
          </div>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <TextInput
              onChange={(e) => setUsername(e.target.value)}
              className="mb-3"
              label="Username"
              placeholder="Username"
              required
            />
            <TextInput
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3"
              label="Password"
              placeholder="Password"
              required
            />
            <Select
              label="Role atau Level"
              required
              placeholder="Pilih Role"
              data={['Supervisor', 'Admin', 'Superadmin', 'Employee']}
              defaultValue="Employee"
              allowDeselect={false}
              value={role}
              onChange={(value) => setRole(value || '')}
            />
            <div className="flex gap-3">
              <Button type="submit" color="blue" className="mt-5">
                Simpan
              </Button>
              <Button onClick={NavBack} type="button" color="gray" className="mt-5">
                Batal
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
