import { Badge, Divider, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetAttendanceRequest } from '../api/getAttendanceRequest';
import { AttendanceRequestType } from '../types';

// type AttendanceRequestProps = {
//   dataAttendanceRequest: AttendanceRequestType[];
// };

export const LateRequestList: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  const [attendanceRequest, setAttendanceRequest] = useState<AttendanceRequestType[]>([]);
  const { data: DataAttendanceRequest, isLoading: LoadingAttendanceRequest } =
    useGetAttendanceRequest(creds?.employee_id);
  useEffect(() => {
    if (DataAttendanceRequest) {
      setAttendanceRequest(DataAttendanceRequest);
    }
  }, [DataAttendanceRequest]);

  if (LoadingAttendanceRequest) {
    return (
      <div className="w-full col-span-12">
        <section className="min-h-96 flex flex-col items-center justify-center mt-10">
          <Loader size={50} />
          <span className="font-bold text-slate-400 text-xl mt-10">Memuat lokasi absen...</span>
        </section>
      </div>
    );
  }

  return (
    <div className="text-center">
      {attendanceRequest.length > 0 ? (
        attendanceRequest.map((request, index) => (
          <button
            key={index}
            onClick={() => navigate('/history/data-overtime/detail')}
            className="bg-white mx-auto max-w-xs w-full mt-2 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700"
          >
            <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2 mt-1">
              <div className="col-span-2 text-center m-auto p-2">
                <Text size="30px" fw={700}>
                  06
                </Text>
                <Text style={{ marginTop: '-5px' }} size="xs">
                  April
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
                    color="yellow"
                  >
                    Terlambat
                  </Badge>
                  <Badge
                    size="xs"
                    style={{
                      marginRight: '5px',
                      borderRadius: '2px',
                    }}
                    color="red"
                  >
                    Belum disetujui
                  </Badge>
                </div>
                <div className="text-left mt-2">
                  <Text lineClamp={1} style={{ marginLeft: '6px' }} size="14px" fw={700}>
                    Mengantarkan paman lomba catur kelas dasar
                  </Text>
                </div>

                <Divider my="sm" />
                <div className="-mt-2 w-full grid grid-cols-12 mb-3">
                  <div className="col-span-8 text-left mt-1 ms-1">
                    <Text style={{ marginLeft: '4px', paddingBottom: '2px' }} size="13px" fw={500}>
                      Kamis, 06 Juni 2024
                    </Text>
                  </div>
                  <div className="col-span-4 text-right -mt-1"></div>
                </div>
              </div>
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
          <span className="font-bold text-slate-400 text-xl">Belum ada data izin</span>
        </section>
      )}
    </div>
  );
};
