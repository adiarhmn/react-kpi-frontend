import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { CreateAttendanceLocationType } from '../../api';

interface LocationMarkerProps {
  position: any;
  setPosition: (position: any) => void;
}

interface FormLocationsProps {
  onSubmit: (data: CreateAttendanceLocationType) => void;
  loading?: boolean;
  initialValues?: CreateAttendanceLocationType;
}
const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  useMapEvents({
    click: (event) => {
      const newPosition = event.latlng;
      setPosition([newPosition.lat, newPosition.lng]);
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

export const FormLocations: React.FC<FormLocationsProps> = ({
  onSubmit,
  loading,
  initialValues,
}) => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const [position, setPosition] = useState<any>(
    initialValues?.latitude
      ? [initialValues.latitude, initialValues.longitude]
      : [-3.7574460576946107, 114.77034083691885]
  );
  const form = useForm({
    initialValues: {
      name: initialValues?.name ?? '',
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: form.values.name,
      latitude: position[0].toString(),
      longitude: position[1].toString(),
      company_id: creds?.company_id ?? 0,
      id: initialValues?.id,
    };

    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        className="mb-3"
        label="Nama Lokasi"
        placeholder="Nama lokasi"
        required
        {...form.getInputProps('name')}
      />
      <MapContainer style={{ height: '33vh' }} center={position} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition}></LocationMarker>
      </MapContainer>
      <Button type="submit" className="mt-4" loading={loading}>
        Simpan
      </Button>
    </form>
  );
};
