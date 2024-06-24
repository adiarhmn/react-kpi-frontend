/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import { formatterDate } from '@/features/history';
import { usePutAttendanceRequest } from '@/features/schedule/api';
import { Badge, Button, Divider, Text } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';

export const DetailEmployeeAttendanceRequest: React.FC = () => {
  const location = useLocation();
  const attendanceRequest = location.state.attendance;
  const navigate = useNavigate();
  const customIcon = new Icon({
    iconUrl: '/images/location-icon.svg',
    iconSize: [50, 50],
  });

  const MutationUpdateAttendanceRequest = usePutAttendanceRequest();

  const HandleUpdateRequest = async (status: string) => {
    const DataPut = {
      ...attendanceRequest,
      status: status,
    };

    await MutationUpdateAttendanceRequest.mutateAsync(DataPut, {
      onSuccess: () => {
        localStorage.setItem('hasNotifiedEmployeeRequest', 'no');
        // navigate('/late-request', { state: { success: 'Absensi berhasil diajukan!' } });
        navigate('/employee-request', {
          state: { success: `Status pengajuan absensi berhasil diubah` },
        });
      },
      onError: (error) => {
        console.log('Error :', error);
      },
    });
  };

  console.log('Data Attendence : ', attendanceRequest);
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center ">
          <div className="flex items-center text-blue-700 gap-3">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Detail pengajuan</h2>
          </div>
          <div className="-mt-2"></div>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Absen</span>
          <Badge
            size="sm"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={
              attendanceRequest?.status == 'Disetujui'
                ? 'green'
                : attendanceRequest?.status == 'Ditolak'
                  ? 'red'
                  : 'yellow'
            }
          >
            {attendanceRequest?.status}
          </Badge>
        </div>
        <Divider size={'sm'} />
        <div className="w-full p-2">
          <div className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700">
            <MapContainer
              style={{ height: '33vh' }}
              center={[
                parseFloat(attendanceRequest.attendance_request_lat),
                parseFloat(attendanceRequest.attendance_request_lon),
              ]}
              zoom={15}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <>
                <Marker
                  position={[
                    parseFloat(attendanceRequest.attendance_request_lat),
                    parseFloat(attendanceRequest.attendance_request_lon),
                  ]}
                  icon={customIcon}
                >
                  <Popup>Lokasi {attendanceRequest.employee.name}</Popup>
                </Marker>
              </>
            </MapContainer>
          </div>
          <div className="mt-4 px-2">
            <div className="w-full grid grid-cols-12">
              <div className="col-span-6">
                <Text size="xs" fw={700}>
                  Tanggal
                </Text>
                <Text size="xs">
                  {attendanceRequest.date != null
                    ? formatterDate(attendanceRequest.date, 'EEEE, dd MMM yyyy')
                    : '-- --'}
                </Text>
              </div>
              <div className="col-span-6 ms-4">
                <Text size="xs" fw={700}>
                  Waktu Check In
                </Text>
                <Text size="xs">
                  {attendanceRequest.date != null
                    ? formatterDate(attendanceRequest.date, 'HH:mm')
                    : '-- --'}
                </Text>
              </div>
            </div>
            <div className="mt-2">
              <Text size="xs" fw={700}>
                Alasan
              </Text>
              <Text size="xs">{attendanceRequest.reason}</Text>
            </div>
          </div>
        </div>
        <div className="w-full mt-7 grid grid-cols-12 text-center px-2 gap-x-2 pb-2">
          <div className="col-span-6">
            <Button
              fullWidth
              onClick={() => HandleUpdateRequest('Ditolak')}
              type="submit"
              color="grey"
            >
              Tolak
            </Button>
          </div>
          <div className="col-span-6">
            <Button fullWidth onClick={() => HandleUpdateRequest('Disetujui')} color="blue">
              Setujui
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
