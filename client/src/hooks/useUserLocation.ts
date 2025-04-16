import { useState, useCallback } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseUserLocationResult {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
  getCurrentPosition: (
    onSuccess?: (position: GeolocationPosition) => void,
    onError?: (error: GeolocationPositionError) => void
  ) => void;
}

export function useUserLocation(): UseUserLocationResult {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentPosition = useCallback(
    (
      onSuccess?: (position: GeolocationPosition) => void,
      onError?: (error: GeolocationPositionError) => void
    ) => {
      if (!navigator.geolocation) {
        const geolocationError = new Error("Geolocation is not supported by your browser.");
        setError(geolocationError.message);
        onError?.(geolocationError as unknown as GeolocationPositionError);
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(coords);
          setIsLoading(false);
          onSuccess?.(position);
        },
        (positionError) => {
          setError(positionError.message);
          setIsLoading(false);
          onError?.(positionError);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    },
    []
  );

  return {
    coordinates,
    error,
    isLoading,
    getCurrentPosition,
  };
}
