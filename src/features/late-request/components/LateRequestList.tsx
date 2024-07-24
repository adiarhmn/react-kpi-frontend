import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { formatterDate } from '@/features/history';

import { useGetAttendanceRequest } from '../api/getAttendanceRequest';
import { AttendanceRequestType } from '../types';

type LateRequestProps = {
  status: string;
  filterState: boolean;
};

export const LateRequestList: React.FC<LateRequestProps> = ({
  status,
  filterState,
}: LateRequestProps) => {
  const navigate = useNavigate();
  const { creds } = useAuth();

  const [params, setParams] = useState({
    employeeID: creds?.employee_id,
    status: status,
  });
  useEffect(() => {
    const newParams = {
      employeeID: creds?.employee_id,
      status,
    };
    setParams(newParams);
  }, [filterState, status]);

  const [attendanceRequest, setAttendanceRequest] = useState<AttendanceRequestType[]>([]);
  const { data: DataAttendanceRequest, isLoading: LoadingAttendanceRequest } =
    useGetAttendanceRequest(params.employeeID, params.status);
  useEffect(() => {
    if (DataAttendanceRequest) {
      setAttendanceRequest(DataAttendanceRequest);
    }
  }, [DataAttendanceRequest]);

  if (LoadingAttendanceRequest) {
    return (
      <div className="flex justify-center my-20">
        <Loader size="sm" />
      </div>
    );
  }

  return (
    <div className="text-center">
      {attendanceRequest.length > 0 ? (
        attendanceRequest.map((request, index) => (
          <button
            key={index}
            onClick={() =>
              navigate('/late-request/detail', {
                state: { attendanceRequest: attendanceRequest[index] },
              })
            }
            className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2 mt-1">
              <div className="col-span-2 text-center m-auto p-2">
                <Text size="30px" fw={700}>
                  {request.date != null ? formatterDate(new Date(request.date), 'dd') : '--'}
                </Text>
                <Text style={{ marginTop: '-5px' }} size="xs">
                  {request.date != undefined ? formatterDate(new Date(request.date), 'MMM') : '--'}
                </Text>
              </div>
              <div className="col-span-10 ms-2">
                <div className="text-right -mt-2">
                  <Badge
                    size="xs"
                    style={{
                      marginRight: '5px',
                      borderRadius: '2px',
                    }}
                    color={
                      request.status == 'Disetujui'
                        ? 'green'
                        : request.status == 'Ditolak'
                          ? 'red'
                          : 'yellow'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
                <div className="w-full grid grid-cols-12 mb-3">
                  <div className="col-span-12 text-left mt-1 ms-1">
                    <Text lineClamp={1} style={{ marginLeft: '6px' }} size="14px" fw={700}>
                      {request.reason}
                    </Text>
                  </div>
                </div>
                <Divider my="sm" />
              </div>
            </div>
          </button>
        ))
      ) : (
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <img
            className="w-28 mb-2 bg-slate-200 rounded-full p-2"
            src="/images/blank-canvas.svg"
            alt=""
          />
          <span className="font-bold text-slate-400 text-sm">Belum ada pengajuan absen</span>
        </section>
      )}
    </div>
  );
};
