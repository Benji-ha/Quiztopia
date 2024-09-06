import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Question } from '../../quiz.d';

interface QuizMapProps {
  quizzes: Question[];
  onMapClick?: (latLng: { lat: number; lng: number }) => void;
}

const ClickHandler = ({ onMapClick }: { onMapClick?: (latLng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(event) {
      if (onMapClick) {
        const { lat, lng } = event.latlng;
        onMapClick({ lat, lng });
      }
    },
  });

  return null;
};

const QuizMap = ({ quizzes, onMapClick }: QuizMapProps) => {
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserPosition([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);

  return (
    <MapContainer center={userPosition || [57.708870, 11.974560]} zoom={11} style={{ height: '500px', width: '1000px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <ClickHandler onMapClick={onMapClick} />

      {quizzes.map((question, index) => {
        const position: LatLngExpression = [
          parseFloat(question.location.latitude),
          parseFloat(question.location.longitude),
        ];
        return (
          <Marker key={index} position={position}>
            <Popup>
              <strong>{question.question}</strong>
              <br />
              Answer: {question.answer}
            </Popup>
          </Marker>
        );
      })}

      {userPosition && (
        <Marker position={userPosition}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default QuizMap;
