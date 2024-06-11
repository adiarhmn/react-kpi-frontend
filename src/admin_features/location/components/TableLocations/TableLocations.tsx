import { ActionIcon, Table } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { AttendanceLocationsType } from '@/admin_features/types';
import { useAuth } from '@/features/auth';

import { useGetLocations } from '../../api';

export const TableLocations: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (creds === null) navigate('/login');
  const { data, isLoading, error } = useGetLocations(creds?.company_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const NavigateUpdate = (location: AttendanceLocationsType) => {
    navigate('/locations/update', { state: location });
  };

  console.log(data);
  return (
    <main>
      <div className="mb-5">
        <Table withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="font-bold">No</Table.Th>
              <Table.Th className="font-bold">Nama Lokasi</Table.Th>
              <Table.Th className="font-bold">Latitude</Table.Th>
              <Table.Th className="font-bold">Longitude</Table.Th>
              <Table.Th className="flex gap-2 items-center justify-center font-bold">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((Locations: AttendanceLocationsType, index: number) => {
              return (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{Locations?.name}</Table.Td>
                  <Table.Td>{Locations?.latitude}</Table.Td>
                  <Table.Td>{Locations?.longitude}</Table.Td>
                  <Table.Td className="flex gap-2 items-center justify-center">
                    <ActionIcon onClick={() => NavigateUpdate(Locations)} color="yellow">
                      <IconPencil size={14} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </div>

      <div className="text-xs mb-2 italic">Click Pada Marker untuk melihat Nama Lokasi</div>
      {data.length === 0 && <div>Data Lokasi Tidak Ditemukan</div>}
      {data.length > 0 && (
        <MapContainer
          style={{ height: '33vh' }}
          center={[data[0].latitude, data[0].longitude]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((location: any) => (
            <Marker key={location.id} position={[location.latitude, location.longitude]}>
              <Popup>
                <h4>{location.name}</h4>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </main>
  );
};
