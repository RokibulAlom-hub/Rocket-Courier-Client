
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude,address }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
