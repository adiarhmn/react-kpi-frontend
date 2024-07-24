import { Divider, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const ListLaborerGroup: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-2">
      <button
        onClick={() => navigate(`/laborer-group/session`)}
        className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative  px-2 text-slate-700 mt-1 mb-1"
      >
        <div className="w-full grid grid-cols-12 -mb-2 p-4">
          <div className="col-span-12 py-2 -mt-2">
            <div className="my-auto text-left">
              <Text lineClamp={1} size={'md'} fw={700}>
                Kelompok Penerbang Roket
              </Text>
            </div>
            <Divider className="w-full mt-2" />
            <div className="grid grid-cols-12 text-left">
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah pekerja : 6
                </Text>
              </div>
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah sesi : 4
                </Text>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => navigate(`/laborer-group/session`)}
        className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative  px-2 text-slate-700 mt-1"
      >
        <div className="w-full grid grid-cols-12 -mb-2 p-4">
          <div className="col-span-12 py-2 -mt-2">
            <div className="my-auto text-left">
              <Text lineClamp={1} size={'md'} fw={700}>
                Kelompok Penerbang Roket 2
              </Text>
            </div>
            <Divider className="w-full mt-2" />
            <div className="grid grid-cols-12 text-left">
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah pekerja : 14
                </Text>
              </div>
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah sesi : 7
                </Text>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
