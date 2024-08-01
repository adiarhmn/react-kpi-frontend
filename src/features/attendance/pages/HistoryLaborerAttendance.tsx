import { Badge, Divider, Select, Text } from '@mantine/core';
import {
  IconCalendar,
  IconChevronLeft,
  IconClock,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GroupType, SessionType, WorkerAttendanceType } from '../types';
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useGetSession, useGetWorkerAttendanceByGroup } from '../api';
import { formatterDate } from '@/features/history';

export const HistoryLaborerAttendance: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state.group as GroupType;

  const [valueSelectSession, setValueSelectSession] = useState<string | null>('');
  const [selectedSessionLabel, setSelectedSessionLabel] = useState<string>('');

  const [session, setSession] = useState<{ value: string; label: string }[]>([]);
  const { data: DataSession, isLoading: LoadingSession } = useGetSession(group.id);

  useEffect(() => {
    if (DataSession) {
      const sessionOptions = DataSession.map((session: SessionType) => ({
        value: session.id.toString(),
        label: session.name,
      }));
      setSession(sessionOptions);
    }
  }, [DataSession]);
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [LaborerAttendances, setLaborerAttendances] = useState<WorkerAttendanceType[]>([]);
  const { data: DataLaborerAttendance } = useGetWorkerAttendanceByGroup(
    formatterDate(dateValue, 'yyyy-MM-dd'),
    group.id,
    valueSelectSession ?? session[0].value
  );
  useEffect(() => {
    if (DataLaborerAttendance) {
      setLaborerAttendances(DataLaborerAttendance);
    }
  }, [DataLaborerAttendance, valueSelectSession]);

  const handleSelectChange = (value: string | null) => {
    const selectedOption = session.find((option) => option.value === value);
    setSelectedSessionLabel(selectedOption ? selectedOption.label : '');
    setValueSelectSession(selectedOption ? selectedOption.value : '');
  };

  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate('/laborer-group/session', { state: { group: group } });
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Riwayat absensi pekerja</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 ">
        <div className="flex justify-between items-center text-blue-700 mb-1 px-2">
          <div className="flex items-center">
            <Text fw={700} c="blue">
              Kelompok
            </Text>
          </div>
          <span className="font-semibold">
            <IconUsersGroup />
          </span>
        </div>
        <Divider size={'sm'} />
        <div className="grid grid-cols-12 px-2 mb-1">
          <div className="col-span-12 py-2">
            <div className="my-auto text-center">
              <Text lineClamp={1} size={'md'} fw={700}>
                {group.name}
              </Text>
            </div>
            <Divider className="w-full mt-2" />
            <div className="grid grid-cols-12 text-center">
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah pekerja :
                  {group && group.EmployeeGroups ? group.EmployeeGroups.length : '0'}
                </Text>
              </div>
              <div className="col-span-6">
                <Text size={'xs'} fw={500}>
                  Jumlah sesi :{group && group.GroupSessions ? group.GroupSessions.length : '0'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xs bg-white w-full shadow-md rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2 pb-5">
        <div className="flex justify-between text-xs  text-blue-700 items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Kalender
            </Text>
          </div>
          <div className="my-auto text-right -mt-2 me-2">
            <IconCalendar />
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="flex justify-center">
          <DatePicker value={dateValue} onChange={setDateValue} />
        </div>
      </section>

      <section className="mx-auto max-w-xs bg-white w-full shadow-md rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2">
        <div className="flex justify-between text-xs  text-blue-700 items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Sesi
            </Text>
          </div>
          <div className="my-auto text-right -mt-2 me-2">
            <IconClock />
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="px-4 justify-center mb-5">
          <Select
            label="Pilih sesi"
            placeholder="Pilih sesi pekerja"
            data={session}
            onChange={handleSelectChange}
          /> 
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs px-3 py-3 shadow-md rounded-lg flex flex-col mt-2 mb-8">
        <div className="flex justify-between items-center text-blue-700 mb-1 px-2 py-1">
          <div className="flex items-center">
            <Text fw={700} c="blue">
              Daftar pekerja
            </Text>
          </div>
          <span className="font-semibold">
            <IconUser />
          </span>
        </div>
        <Divider size={'sm'} className="mb-3" />

        {LaborerAttendances.length > 0 ? (
          LaborerAttendances.map((labAtt, index) => (
            <div key={index} className="grid grid-cols-12 px-2 mb-1 -mt-4">
              <div className="col-span-12 py-2">
                <div className="my-auto">
                  <div className="text-end mb-1">
                    {selectedSessionLabel && (
                      <Badge
                        size="sm"
                        className="uppercase me-1"
                        style={{
                          borderRadius: '2px',
                        }}
                        color={'grape'}
                      >
                        {selectedSessionLabel}
                      </Badge>
                    )}
                    <Badge
                      size="sm"
                      className="uppercase"
                      style={{
                        borderRadius: '2px',
                      }}
                      color={
                        labAtt.attendance_status == 'H'
                          ? 'green'
                          : labAtt.attendance_status == 'A'
                            ? 'red'
                            : 'yellow'
                      }
                    >
                      {labAtt.attendance_status == 'H'
                        ? 'Hadir'
                        : labAtt.attendance_status == 'A'
                          ? 'Absen'
                          : 'Izin'}
                    </Badge>
                  </div>
                  <div>
                    <Text lineClamp={1} size={'sm'} fw={800}>
                      {labAtt.employee.name}
                    </Text>
                  </div>
                </div>
                <Divider className="w-full mt-1 mb-1" />
                <div className="grid grid-cols-12 text-left mb-4">
                  <div className="col-span-4">
                    <Text size={'xs'} fw={500}>
                      Keterangan :
                    </Text>
                  </div>
                  <div className="col-span-4">
                    <Text size={'xs'} fw={500}>
                      {labAtt.detail}
                    </Text>
                  </div>
                </div>
                <div className="mt-4">
                  <Divider size={'lg'} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full col-span-12">
            <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-15">
              <img
                className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                src="/images/blank-canvas.svg"
                alt=""
              />
              <span className="font-bold text-slate-400 text-base">
                Belum ada data absensi pekerja lepas
              </span>
            </section>
          </div>
        )}
      </section>
    </main>
  );
};
