/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { AttendanceType, useGetAttendanceByDivision } from '@/features/attendance';
import { formatterDate } from '@/features/history';
import { Divider, Loader, Text } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AttendanceSectionProps = {
  division_id?: number;
  date: Date | null;
};

export const EmployeeAttendancesSection: React.FC<AttendanceSectionProps> = ({
  division_id,
  date,
}: AttendanceSectionProps) => {
  const navigate = useNavigate();
  const [dataAttendances, setDataAttendances] = useState<AttendanceType[]>([]);
  const { data: DataAttendances, isLoading: LoadingAttendances } = useGetAttendanceByDivision(
    division_id,
    formatterDate(new Date(date ?? 0), 'yyyy-MM-dd')
  );
  useEffect(() => {
    if (DataAttendances) {
      setDataAttendances(DataAttendances);
    }
  }, [DataAttendances, division_id]);

  if (LoadingAttendances) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }
  console.log(dataAttendances);
  return (
    <>
      <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 py-2 px-2 text-slate-700 mb-6 mt-2">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Kehadiran
            </Text>
          </div>
          <div className="my-auto text-right -mt-1 me-2">
            <IconCalendar />
          </div>
        </div>
        <Divider size={'sm'} />
        <div className="item-center mt-2">
          {dataAttendances.length > 0 ? (
            dataAttendances.map((att, index) => (
              <button
                key={index}
                onClick={() =>
                  navigate(`/employee-division/monthly-attendance/detail`, {
                    state: { attendance: att },
                  })
                }
                className="bg-white mx-auto max-w-xs w-full mt-1 mb-2 shadow-sm rounded-xl z-50 relative  px-2 text-slate-700 mt-1"
              >
                <div className="w-full grid grid-cols-12 -mb-2 pt-2 p-4">
                  <div className="col-span-2  text-center -ms-3 -mt-2">
                    <img className="w-full rounded-lg p-2" src="/images/profile-pic.svg" alt="" />
                  </div>
                  <div className="col-span-10">
                    <div className="my-auto text-right -mt-2 -me-3"></div>
                    <div className="my-auto text-left ms-2">
                      <Text lineClamp={1} size={'sm'} fw={700}>
                        {att?.employee.name}
                      </Text>
                    </div>
                    <Divider className="w-full mt-2" />
                    <div className="grid grid-cols-12 text-left ms-2">
                      <div className="col-span-6">
                        <Text size={'xs'} fw={500}>
                          Masuk :{' '}
                          {att?.check_in != null ? formatterDate(att?.check_in, 'HH:mm') : '--:--'}
                        </Text>
                      </div>
                      <div className="col-span-6">
                        <Text size={'xs'} fw={500}>
                          Keluar :{' '}
                          {att?.check_out != null
                            ? formatterDate(att?.check_out, 'HH:mm')
                            : '--:--'}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <section className="min-h-96 flex flex-col items-center justify-center -mt-10 -mb-10">
              <img
                className="w-28 mb-2 bg-slate-200 rounded-full p-2"
                src="/images/blank-canvas.svg"
                alt=""
              />
              <span className="font-bold text-slate-400 text-sm">Ops! Kehadiran kosong</span>
              <span className="font-normal text-slate-400 text-xs">
                Tidak ada yang absen hari ini
              </span>
            </section>
          )}
        </div>
      </section>
    </>
  );
};
