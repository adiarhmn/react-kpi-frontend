import { Badge, Divider, Text } from '@mantine/core';

export const AbsenceList: React.FC = () => {
  return (
    <>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700">
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
          {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
          <div className="col-span-2 text-center -ms-3">
            <Text size="30px" fw={700}>
              3
            </Text>
            <Text style={{ marginTop: '-5px' }} size="xs">
              Hari
            </Text>
          </div>
          <div className="col-span-10">
            <div className="my-auto text-right -mt-3 -me-3">
              <Badge
                size="xs"
                style={{
                  marginTop: '7px',
                  marginLeft: '4px',
                  borderRadius: '2px',
                }}
                color="red"
              >
                Sakit
              </Badge>
              <Badge
                size="xs"
                style={{
                  marginTop: '7px',
                  marginLeft: '4px',
                  borderRadius: '2px',
                }}
                color="green"
              >
                Disetujui
              </Badge>
            </div>
            <div className="my-auto text-center mt-2">
              <Divider orientation="vertical" />
              <Text size="18px" fw={700}>
                15 - 17 April 2024
              </Text>
            </div>
          </div>
        </div>
        <div>
          <Text style={{ marginLeft: '4px', padding: '8px' }} size="11px" fw={500}>
            Tanggal pengajuan : Sabtu, 13 April 2024
          </Text>
        </div>
      </section>
      <section className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700">
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
          {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
          <div className="col-span-2 text-center -ms-3">
            <Text size="30px" fw={700}>
              2
            </Text>
            <Text style={{ marginTop: '-5px' }} size="xs">
              Hari
            </Text>
          </div>
          <div className="col-span-10">
            <div className="my-auto text-right -mt-3 -me-3">
              <Badge
                size="xs"
                style={{
                  marginTop: '7px',
                  marginLeft: '4px',
                  borderRadius: '2px',
                }}
                color="#1971C2"
              >
                Izin
              </Badge>
              <Badge
                size="xs"
                style={{
                  marginTop: '7px',
                  marginLeft: '4px',
                  borderRadius: '2px',
                }}
                color="green"
              >
                Disetujui
              </Badge>
            </div>
            <div className="my-auto text-center mt-2">
              <Divider orientation="vertical" />
              <Text size="18px" fw={700}>
                10 - 11 Maret 2024
              </Text>
            </div>
          </div>
        </div>
        <div>
          <Text style={{ marginLeft: '4px', padding: '8px' }} size="11px" fw={500}>
            Tanggal pengajuan : Selasa, 8 April 2024
          </Text>
        </div>
      </section>
    </>
  );
};
