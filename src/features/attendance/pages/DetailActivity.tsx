/* eslint-disable import/order */
import { IconCalendarEvent, IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActivityAliasType, ActivityDetailType } from '../types';
import { Divider } from '@mantine/core';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const DetailActivity: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activity = location.state.activity as ActivityDetailType;
  const alias = location.state.alias as ActivityAliasType;
  const index = location.state.index as number;
  console.log(index);
  console.log(activity);
  return (
    <main>
      <section className="w-full h-20 bg-blue-600 rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between items-center text-blue-700 mb-1">
          <div className="flex items-center">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
            <h2 className="font-semibold ">Detail kegiatan</h2>
          </div>
          <span className="font-semibold"></span>
        </div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full mt-2 mb-7 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
        <div className="flex justify-between text-xs items-center p-2">
          <span className="text-base font-bold text-blue-700">Kegiatan ke {index + 1}</span>
          <IconCalendarEvent className="opacity-80" size={20} />
        </div>
        <Divider size={'sm'} />
        <div className="w-full p-2">
          <section className="bg-white mx-auto max-w-xs w-full z-50 relative p-2 px-2 text-slate-700 ">
            <MapContainer
              key={activity ? 'loaded' : 'notLoaded'}
              style={{ height: '33vh' }}
              center={[activity.activity_lat, activity.activity_lon]}
              zoom={15}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[activity.activity_lat, activity.activity_lon]}>
                <Popup>Lokasi anda</Popup>
              </Marker>
            </MapContainer>
          </section>
        </div>
      </section>
    </main>
  );
};
