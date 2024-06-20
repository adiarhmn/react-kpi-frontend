/* eslint-disable import/order */
import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

interface Coordinates {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface ErrorData {
  code: number;
  message: string;
}

interface LocationData {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: ErrorData;
}

export const useGeoLocation = (): LocationData => {
  const [location, setLocation] = useState<LocationData>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  });

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        loaded: true,
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    } catch (error: any) {
      setLocation({
        loaded: true,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return location;
};
