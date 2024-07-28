import { useAuth } from '@/features/auth';
import { Divider, Loader, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useGetGroup, useGetGroupByCompany } from '../api/getGroup';
import { useEffect, useState } from 'react';
import { GroupType } from '../types';

export const ListLaborerGroup: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const { data: DataGroups, isLoading: LoadingGroups } = useGetGroupByCompany(creds?.company_id);
  useEffect(() => {
    if (DataGroups) {
      setGroups(DataGroups);
    }
  }, [DataGroups]);
  console.log('Data group : ', groups);

  if (LoadingGroups) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  return (
    <div className="text-center mt-2">
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <button
            key={index}
            onClick={() => navigate(`/laborer-group/session`, { state: { group: group } })}
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative  px-2 text-slate-700 mt-1 mb-1"
          >
            <div className="w-full grid grid-cols-12 -mb-2 p-4">
              <div className="col-span-12 py-2 -mt-2">
                <div className="my-auto text-center">
                  <Text lineClamp={1} size={'md'} fw={700}>
                    {group.name}
                  </Text>
                </div>
                <Divider className="w-full mt-2" />
                <div className="grid grid-cols-12 text-center">
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Jumlah pekerja :{' '}
                      {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
                    </Text>
                  </div>
                  <div className="col-span-6">
                    <Text size={'xs'} fw={500}>
                      Jumlah sesi :{' '}
                      {group && group.GroupSessions ? group.GroupSessions.length : '0'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="w-full col-span-12">
          <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-13">
            <img
              className="w-28 mb-2 bg-slate-200 rounded-full p-2"
              src="/images/blank-canvas.svg"
              alt=""
            />
            <span className="font-bold text-slate-400 text-base">Belum ada data kelompok</span>
          </section>
        </div>
      )}
    </div>
  );
};
