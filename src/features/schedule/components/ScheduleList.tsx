import { Badge, Divider, Loader, Text } from '@mantine/core';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScheduleType } from '@/features/attendance';
import { useGetSchedule, useGetScheduleMonthly } from '../api';
import { useAuth } from '@/features/auth';
type ScheduleProps = {
  month: Date;
};

export const ScheduleList: React.FC<ScheduleProps> = ({ month }) => {
  const navigate = useNavigate();
  // const [month, setMonth] = useState<Date>(new Date());
  const { creds } = useAuth();
  const [schedules, setSchedule] = useState<ScheduleType[]>([]);
  const { data, error, isLoading } = useGetScheduleMonthly(
    creds?.employee_id,
    month.getMonth() + 1,
    month.getFullYear()
  );
  useEffect(() => {
    // console.log('effect jalan');
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  function formatDate(date: string, formatType: string) {
    const dateToFormat: Date = new Date(date);
    const formattedDate = format(dateToFormat, formatType, { locale: id });
    return formattedDate;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-600 text-center my-20 font-bold">{error.message}</div>;
  }

  // console.log('Data schedule :', schedule);

  return (
    <div className="text-center">
      <div className="w-full grid grid-cols-12 px-6">
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <div key={index} className="col-span-6 px-1">
              <button
                onClick={() => navigate('/history/data-absence/detail')}
                className=" bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 divide-y divide-gray-300 text-slate-700"
              >
                <div className="w-full grid grid-cols-12 divide-x divide-gray-300 pb-2 pt-2 p-4">
                  {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
                  <div className="col-span-4 text-center -ms-5 mt-4">
                    <Text size="30px" fw={700}>
                      {formatDate(schedule?.date, 'dd')}
                    </Text>
                    <Text style={{ marginTop: '-5px' }} size="xs">
                      {formatDate(schedule?.date, 'MMM')}
                    </Text>
                  </div>
                  <div className="col-span-8">
                    <div className="my-auto text-right -mt-3 -me-3">
                      <Badge
                        size="xs"
                        style={{
                          fontSize: '7px',
                          marginTop: '7px',
                          marginLeft: '4px',
                          borderRadius: '2px',
                        }}
                        // color={absence?.type == 'Sakit' ? 'yellow' : 'blue  '}
                        color="blue"
                      >
                        {schedule?.shift.shift_name}
                      </Badge>
                      <Badge
                        size="xs"
                        style={{
                          fontSize: '7px',
                          marginTop: '7px',
                          marginLeft: '4px',
                          borderRadius: '2px',
                        }}
                        // color={absence?.status == 'Disetujui' ? 'green' : 'red'}
                        color={schedule?.status == 'on' ? 'green' : 'red'}
                      >
                        {schedule?.status}
                      </Badge>
                    </div>
                    <div className="my-auto ms-4 mt-1">
                      <Text size="30px" fw={700}>
                        {/* {formatdate(absence?.date_start)} */}
                        SF2
                      </Text>
                      <Text size="7px" fw={500}>
                        {/* {formatdate(absence?.date_start)} */}
                        {schedule?.shift.start_time} - {schedule?.shift.end_time}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="text-left -mb-2">
                  <Text style={{ marginLeft: '0px', padding: '8px' }} size="9px" fw={500}>
                    Hari : {formatDate(schedule?.date, 'EEEE, dd MMM yyyy')}
                  </Text>
                </div>
              </button>
            </div>
          ))
        ) : (
          <div className="w-full col-span-12">
            <section className="min-h-96 flex flex-col items-center justify-center mt-10">
              <img
                className="w-40 mb-2 bg-slate-200 rounded-full p-2"
                src="/images/blank-canvas.svg"
                alt=""
              />
              <span className="font-bold text-slate-400 text-xl">Belum ada data izin</span>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
