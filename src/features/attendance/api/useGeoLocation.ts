import { useState, useEffect } from 'react';

interface Coordinates {
  latitude: any; //adi pak ai
  longitude: any; // ini adi jua pak ai
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

  const onSuccess = (location: { coords: Coordinates }): void => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError): void => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      } as GeolocationPositionError);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};
