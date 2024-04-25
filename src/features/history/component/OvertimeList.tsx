import { Badge, Divider, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const OvertimeList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <button
        onClick={() => navigate('/history/data-overtime/detail')}
        className=" bg-white mx-auto max-w-xs w-full mt-4 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
      >
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-2 text-center m-auto p-2">
            <Text size="30px" fw={700}>
              18
            </Text>
            <Text style={{ marginTop: '-5px' }} size="xs">
              April
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <Text style={{ marginLeft: '4px' }} size="14px" fw={700}>
              Menyelesaikan merge conflict
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-6 text-left mt-1 ms-1">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="13px" fw={500}>
                  16:10 - 20:00
                </Text>
              </div>
              <div className="col-span-6 text-right -mt-1">
                <Badge
                  size="xs"
                  style={{
                    marginLeft: '4px',
                    borderRadius: '2px',
                  }}
                  color="green"
                >
                  Disetujui
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate('/history/data-overtime/detail')}
        className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
      >
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-2 text-center m-auto p-2">
            <Text size="30px" fw={700}>
              21
            </Text>
            <Text style={{ marginTop: '-5px' }} size="xs">
              April
            </Text>
          </div>
          <div className="col-span-10 ms-2 text-left">
            <Text style={{ marginLeft: '4px' }} size="14px" fw={700}>
              Melanjutkan proses developing
            </Text>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12">
              <div className="col-span-6 text-left mt-1 ms-1">
                <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="13px" fw={500}>
                  16:10 - 20:00
                </Text>
              </div>
              <div className="col-span-6 text-right -mt-1">
                <Badge
                  size="xs"
                  style={{
                    marginLeft: '4px',
                    borderRadius: '2px',
                  }}
                  color="red"
                >
                  Belum disetujui
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
