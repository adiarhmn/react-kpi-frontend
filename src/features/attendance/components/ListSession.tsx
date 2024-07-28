import { Divider, Text } from '@mantine/core';
import { IconClockEdit, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { GroupType, SessionGroupType } from '../types';
import { useEffect, useState } from 'react';
import { useGetSessionByGroup } from '../api';

type ListSessionProps = {
  group: GroupType;
};
export const ListSession: React.FC<ListSessionProps> = ({ group }: ListSessionProps) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionGroupType[]>([]);
  const { data: DataSession } = useGetSessionByGroup(group.id);
  useEffect(() => {
    if (DataSession) {
      setSessions(DataSession);
    }
  }, [DataSession]);
  console.log("Data session: ", sessions);
  return (
    <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 mb-8 ">
      <div className="flex justify-between items-center text-blue-700 mb-1 px-2">
        <div className="flex items-center">
          <Text fw={700} c="blue">
            Daftar Sesi pekerjaan
          </Text>
        </div>
        <span className="font-semibold">
          <IconClockEdit />
        </span>
      </div>
      <Divider size={'sm'} />
      {sessions.length > 0 ? (
        sessions.map((session, index) => (
          <button
            key={index}
            onClick={() =>
              navigate(`/laborer-group/session/laborer`, {
                state: { group: group, session: session },
              })
            }
            className="grid grid-cols-12 px-2 mb-1 bg-white shadow-md mt-2"
          >
            <div className="col-span-12 py-2">
              <div className="my-auto text-center">
                <Text lineClamp={1} size={'md'} fw={700}>
                  {/* {session.session.name} */}
                  {session.session.name}
                </Text>
              </div>
              <Divider className="w-full mt-2" />
              <div className="grid grid-cols-12 text-center">
                {/* <div className="col-span-6">
                  <Text size={'xs'} fw={500}>
                    Jumlah pekerja :
                    {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
                  </Text>
                </div>
                <div className="col-span-6">
                  <Text size={'xs'} fw={500}>
                    Jumlah hadir : 4
                  </Text>
                </div> */}
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
            <span className="font-bold text-slate-400 text-base">Belum ada data sesi</span>
          </section>
        </div>
      )}
    </section>
  );
};
