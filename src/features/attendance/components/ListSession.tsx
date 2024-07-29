import { Badge, Divider, Indicator, Text } from '@mantine/core';
import { IconClockEdit, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { GroupType, SessionGroupType, SessionType, WorkerAttendanceType } from '../types';
import { useEffect, useState } from 'react';
import { useGetSessionByGroup } from '../api';
import axios from 'axios';
import { formatterDate } from '@/features/history';

type ListSessionProps = {
  group: GroupType;
};
export const ListSession: React.FC<ListSessionProps> = ({ group }: ListSessionProps) => {
  const BaseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionGroupType[]>([]);
  const { data: DataSession } = useGetSessionByGroup(group.id);
  useEffect(() => {
    if (DataSession) {
      setSessions(DataSession);
    }
  }, [DataSession]);

  console.log('Data session: ', sessions);

  const [laborerAttendances, setLaborerAttendance] = useState<
    { session: SessionGroupType; laborerAttendance: WorkerAttendanceType }[]
  >([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const allAttendance = await Promise.all(
        sessions.map(async (session) => {
          try {
            const response = await axios.get(
              `${BaseURL}/worker-attendance?date=${formatterDate(new Date(), 'yyyy-MM-dd')}&session=${session.session_id}&group=${group.id}`
            );
            console.log(
              'URL GET :',
              `${BaseURL}/worker-attendance?date=${formatterDate(new Date(), 'yyyy-MM-dd')}&session=${session.session_id}&group=${group.id}`
            );

            return { session, laborerAttendance: response.data.data };
          } catch (error) {
            console.error(`Error fetching attendance for employee ${session.id}:`, error);
            return { session, laborerAttendance: [] };
          }
        })
      );
      setLaborerAttendance(allAttendance);
    };

    if (sessions.length > 0) {
      fetchAttendance();
    }
  }, [sessions]);

  console.log('DATA SESSION DAN ATTENDANCE :', laborerAttendances);
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
      <div className="grid grid-cols-12 px-2 text-center gap-x-1 mx-auto">
        <div className="col-span-6 flex rounded-md mt-1 ">
          <Indicator inline color={'green'} size={10} className="mt-2 me-3"></Indicator>
          <Text size={'xs'} c={'green'}>
            Sudah absen
          </Text>
        </div>
        <div className="col-span-6 flex rounded-md mt-1 ms-2">
          <Indicator inline color={'red'} size={10} className="mt-2 me-3"></Indicator>
          <Text size={'xs'} c={'red'}>
            Belum absen
          </Text>
        </div>
      </div>
      <div className="mt-2">
        <Divider size={'lg'} />
      </div>
      {laborerAttendances.length > 0 ? (
        laborerAttendances.map((labAtt, index) => (
          <button
            disabled={labAtt.laborerAttendance.length > 0}
            key={index}
            onClick={() =>
              navigate(`/laborer-group/session/laborer`, {
                state: { group: group, session: labAtt.session },
              })
            }
            className={`grid grid-cols-12 px-2 mb-1 ${labAtt.laborerAttendance.length > 0 ? 'bg-slate-200' : 'bg-white'} shadow-md mt-2 mb-2`}
          >
            <div className="col-span-12 py-2">
              <div className="my-auto">
                <div className="text-end -mt-2 -mb-2">
                  {/* <Badge
                    size="xs"
                    className="uppercase rounded-sm"
                    color={labAtt.laborerAttendance != undefined ? 'green' : 'red'}
                  ></Badge> */}
                  <Indicator
                    inline
                    color={labAtt.laborerAttendance.length == 0 ? 'red' : 'green'}
                    size={10}
                    className="mb-1 me-1"
                  ></Indicator>
                </div>
                <div className="text-center">
                  <Text lineClamp={1} size={'md'} fw={700}>
                    {/* {session.session.name} */}
                    {labAtt.session.session.name}
                  </Text>
                </div>
              </div>
              <div className="grid grid-cols-12 text-center"></div>
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
