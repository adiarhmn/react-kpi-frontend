/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { formatterDate } from '@/features/history';
import { AttendanceRequestType } from '@/features/late-request';
import { useGetAttendanceReqByDivision } from '@/features/late-request/api/getAttendanceRequest';
import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AttendanceRequestProps = {
  status: string | null;
  typeRequest: string;
  division_id: number | undefined;
  filterState: boolean;
};

export const EmployeeAttendanceRequestList: React.FC<AttendanceRequestProps> = ({
  status,
  typeRequest,
  division_id,
  filterState,
}: AttendanceRequestProps) => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    divisionID: division_id,
    status: status,
  });
  useEffect(() => {
    const newParams = {
      divisionID: division_id,
      status: status,
    };
    setParams(newParams);
  }, [typeRequest, filterState]);
  const [attendanceReq, setAttendanceReq] = useState<AttendanceRequestType[]>([]);
  const { data: DataAttendanceReq, isLoading: LoadingAttendanceReq } =
    useGetAttendanceReqByDivision(params.divisionID, params.status);
  useEffect(() => {
    if (DataAttendanceReq) {
      setAttendanceReq(DataAttendanceReq);
    }
  }, [DataAttendanceReq, typeRequest, filterState]);

  if (LoadingAttendanceReq) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  console.log('Data absen : ', attendanceReq);
  return (
    <div className="text-center">
      {attendanceReq.length != 0 ? (
        attendanceReq.map((attendance, index) => (
          <button
            key={index}
            onClick={() =>
              navigate(`/employee-request/attendance/detail`, { state: { attendance: attendance } })
            }
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative py-2 px-2 divide-y divide-gray-300 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4 -mb-2">
              {/* <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4"> */}
              <div className="col-span-2 text-center -ms-3">
                <img className="w-full rounded-lg p-2" src="/images/profile-pic.svg" alt="" />
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
                    Absen
                  </Badge>
                  <Badge
                    size="xs"
                    style={{
                      marginTop: '7px',
                      marginLeft: '4px',
                      borderRadius: '2px',
                    }}
                    color={
                      attendance?.status == 'Disetujui'
                        ? 'green'
                        : attendance?.status == 'Belum Disetujui'
                          ? 'yellow'
                          : 'red'
                    }
                  >
                    {attendance?.status}
                  </Badge>
                </div>
                <div className="my-auto text-left ms-3 mt-1">
                  <Divider orientation="vertical" />
                  <Text size={'md'} fw={700}>
                    {attendance.employee.name}
                  </Text>
                </div>
              </div>
            </div>
            <div className="text-left">
              <Text style={{ marginLeft: '0px', padding: '8px' }} size="11px" fw={500}>
                Waktu pengajuan :{' '}
                {formatterDate(new Date(attendance.date), 'HH:mm, EEEE dd MMMM yyyy')}
              </Text>
            </div>
          </button>
        ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-40 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-xl">Belum ada data {typeRequest}</span>
        </section>
      )}
    </div>
  );
};
