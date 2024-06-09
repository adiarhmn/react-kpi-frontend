import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { useGetLocations } from '../../api';

const LocationMarker: React.FC = () => {
  const [position, setPosition] = useState<any>([-3.753033208345266, 114.76683450763974]);
  const map = useMapEvents({
    click: (event) => {
      const newPosition = event.latlng;
      setPosition([newPosition.lat, newPosition.lng]);
      console.log(`New position: ${newPosition.lat}, ${newPosition.lng}`);
    },
  });

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{ click: () => console.log('Marker clicked') }}
    >
      <Popup>Lokasi anda</Popup>
      <Tooltip>Tooltip for Marker</Tooltip>
    </Marker>
  );
};

export const TableLocations: React.FC = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<any>([-3.753033208345266, 114.76683450763974]);
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const { data, isLoading } = useGetLocations(creds?.company_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <main>
      <div>Lokasi</div>
      <MapContainer style={{ height: '33vh' }} center={position} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker></LocationMarker>
      </MapContainer>
    </main>
  );
};
