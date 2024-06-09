import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

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

  console.log(data);
  return (
    <main>
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
