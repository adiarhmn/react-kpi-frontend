import { Badge, Text } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';

import { formatterDate } from '@/features/history';

import { AttendanceRequestType } from '../types';

export const DetailLateRequest: React.FC = () => {
  const location = useLocation();
  const attendanceRequest = location.state.attendanceRequest as AttendanceRequestType;
  const navigate = useNavigate();
  const customIcon = new Icon({
    iconUrl: '/images/location-icon.svg',
    iconSize: [50, 50],
  });

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

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 mt-3 p-5">
        <div className="flex justify-between items-center ">
          <div className="flex items-center text-blue-700 gap-3"></div>
          <Badge
            size="sm"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={attendanceRequest?.status == 'Disetujui' ? 'blue' : 'red'}
          >
            {attendanceRequest?.status}
          </Badge>
        </div>
        <div className="w-full pb-2 mt-1">
          <div>
            {' '}
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
          <div className="mt-4">
            <div className="w-full grid grid-cols-12">
              <div className="col-span-6">
                <Text size="sm" fw={700}>
                  Tanggal
                </Text>
                <Text size="sm">
                  {attendanceRequest.date != null
                    ? formatterDate(attendanceRequest.date, 'EEEE, dd MMM yyyy')
                    : '-- --'}
                </Text>
              </div>
              <div className="col-span-6 ms-4">
                <Text size="sm" fw={700}>
                  Waktu Check In
                </Text>
                <Text size="sm">
                  {attendanceRequest.date != null
                    ? formatterDate(attendanceRequest.date, 'HH:mm')
                    : '-- --'}
                </Text>
              </div>
            </div>
            <div className="mt-2">
              <Text size="sm" fw={700}>
                Alasan
              </Text>
              <Text size="sm">{attendanceRequest.reason}</Text>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
