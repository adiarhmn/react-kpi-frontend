import { Badge, Text } from '@mantine/core';

export const AbsenceList: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700">
      <div className="w-screen grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
        <div className="col-span-1 text-center">
          <Text size="lg" fw={700}>
            3
          </Text>
          <Text style={{ marginTop: '-5px' }} size="xs">
            Hari
          </Text>
        </div>
        <div className="col-span-11 ms-2 text-left">
          <Text style={{ marginLeft: '4px' }} size="11px" fw={700}>
            Minggu, 14 April 2024 - Jum'at, 19 April 2024
          </Text>
          <Badge
            style={{
              marginTop: '7px',
              marginLeft: '4px',
            }}
            color="red"
          >
            Sakit
          </Badge>
        </div>
      </div>
      <div>
        <Text style={{ marginLeft: '4px', padding: '8px' }} size="11px" fw={500}>
          Tanggal pengajuan : Sabtu, 13 April 2024
        </Text>
      </div>
    </section>
  );
};
