import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Props {
  latitude: number;
  longitude: number;
  title: string;
}
export const LocationShow: React.FC<Props> = ({ latitude, longitude, title }) => {
  return (
    <MapContainer
      style={{ height: '33vh', zIndex: 0 }}
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[latitude, longitude]}>
        <Popup>
          <h4>{title}</h4>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
