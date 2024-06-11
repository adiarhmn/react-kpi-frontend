import { Badge, Text } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';

import { formatterDate } from '../api';

export const DetailOvertime: React.FC = () => {
  const location = useLocation();
  const overtime = location.state.overtime;
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
          <div className="flex items-center font-semibold text-blue-700 gap-3">Lembur</div>
          <Badge
            size="sm"
            style={{
              marginLeft: '4px',
              borderRadius: '2px',
            }}
            color={overtime?.status == 'disetujui' ? 'blue' : 'red'}
          >
            {overtime?.status}
          </Badge>
        </div>
        <div className="w-full pb-2 mt-1">
          <div>
            {' '}
            <MapContainer
              style={{ height: '33vh' }}
              center={[parseFloat(overtime.overtime_lat), parseFloat(overtime.overtime_lon)]}
              zoom={15}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <>
                <Marker
                  position={[parseFloat(overtime.overtime_lat), parseFloat(overtime.overtime_lon)]}
                  icon={customIcon}
                >
                  <Popup>Lokasi pengajuan</Popup>
                </Marker>
              </>
            </MapContainer>
          </div>
          <div className="mt-4">
            <div className="w-full mb-3">
              <Text size="sm" fw={700}>
                Tanggal :
                <span className="font-base ms-2">
                  {overtime.start_time != null
                    ? formatterDate(new Date(overtime.start_time), 'EEEE, dd MMMM yyyy')
                    : '-- --'}
                </span>
              </Text>
            </div>
            <div className="w-full grid grid-cols-12">
              <div className="col-span-6">
                <Text size="sm" fw={700}>
                  Jam mulai
                </Text>
                <Text size="sm">
                  {overtime.start_time != null
                    ? formatterDate(new Date(overtime.start_time), 'HH:mm')
                    : '-- --'}
                </Text>
              </div>
              <div className="col-span-6 ms-4">
                <Text size="sm" fw={700}>
                  Jam selesai
                </Text>
                <Text size="sm">
                  {overtime.end_time != null
                    ? formatterDate(new Date(overtime.end_time), 'HH:mm')
                    : '-- --'}
                </Text>
              </div>
            </div>
            <div className="mt-2">
              <Text size="sm" fw={700}>
                Deskripsi
              </Text>
              <Text size="sm">{overtime.detail}</Text>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
