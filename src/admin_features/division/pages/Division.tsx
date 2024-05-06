import { ActionIcon, Button, Input, Select, Table, UnstyledButton } from '@mantine/core';
import { IconInfoCircle, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const Division: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-bold">Daftar Divisi</h2>
            <div className="-mt-1 text-xs text-slate-400">
              Berikut daftar divisi yang terdaftar pada sistem
            </div>
          </div>
          <Button onClick={() => navigate('create')} leftSection={<IconPlus size={16} />}>
            Tambah Divisi
          </Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Cari..." leftSection={<IconSearch size={14}></IconSearch>}></Input>
        </div>
        <div className="mt-7">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className='font-bold'>Kode Divisi</Table.Th>
                <Table.Th className='font-bold'>Nama Divisi</Table.Th>
                <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>DVS001</Table.Td>
                <Table.Td>IT Support</Table.Td>
                <Table.Td className="flex gap-2 items-center justify-center">
                  <ActionIcon color="yellow">
                    <IconPencil size={14} />
                  </ActionIcon>
                  <ActionIcon color="red">
                    <IconTrash size={14} />
                  </ActionIcon>
                  <UnstyledButton>
                    <IconInfoCircle className="text-blue-600" size={20} />
                  </UnstyledButton>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
