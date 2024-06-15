import { Badge, Divider, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type EmployeeRequestListProps = {
  type: string;
};

export const EmployeeRequestList: React.FC<EmployeeRequestListProps> = ({
  type,
}: EmployeeRequestListProps) => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      {/* {absences.length > 0 ? (
        absences.map((absence, index) => ( */}
      <button
        onClick={() => navigate(`/employee-request/detail`)}
        className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
      >
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
          {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
          <div className="col-span-2 text-center -ms-3">
            <Text size="30px" fw={700}>
              12
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
                color="blue"
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
                color="red"
              >
                Belum disetujui
              </Badge>
            </div>
            <div className="my-auto text-center mt-2">
              <Divider orientation="vertical" />
              <Text size="18px" fw={700}>
                {' '}
                Hendy Nur Sholeh
              </Text>
            </div>
          </div>
        </div>
        <div className="text-left">
          <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
            Tanggal pengajuan : 21 Januari 2025
          </Text>
        </div>
      </button>
      {/* ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada data izin</span>
        </section>
      )} */}
    </div>
  );
};
