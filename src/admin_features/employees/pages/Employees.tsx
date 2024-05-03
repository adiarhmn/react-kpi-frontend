import { ActionIcon, Table, UnstyledButton } from "@mantine/core";
import { IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react";

export const Employees: React.FC = () => {
  return (
    <main>
      <section className="bg-white p-3 rounded-lg shadow-lg">
        <div>
          <h2 className="font-bold">Daftar Karyawan</h2>
          <div className="-mt-1 text-xs text-slate-400">Berikut daftar karyawan yang terdaftar pada sistem</div>
        </div>
        <div className="mt-3">
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nama</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Divisi</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>John Doe</Table.Td>
                <Table.Td>jhon@gmail.com</Table.Td>
                <Table.Td>IT Support</Table.Td>
                <Table.Td>Admin</Table.Td>
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
