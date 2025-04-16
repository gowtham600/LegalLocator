import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import { type ProviderWithDistance } from "@shared/schema";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix the marker icon issue in React Leaflet
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore - TS doesn't know about these properties
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface ServiceMapProps {
  providers: ProviderWithDistance[];
  radius: number;
  userLocation: { latitude: number; longitude: number } | null;
}

const ServiceMap = ({ providers, radius, userLocation }: ServiceMapProps) => {
  // If there's no user location or providers, we can't show the map
  if (!userLocation) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Please select a location to view the map</p>
      </div>
    );
  }

  // Center the map on the user's location
  const position: [number, number] = [userLocation.latitude, userLocation.longitude];

  return (
    <div className="h-80 border rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={position} 
        zoom={10} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        <Marker position={position}>
          <Popup>
            Your Location
          </Popup>
        </Marker>
        
        {/* Search radius circle */}
        <Circle 
          center={position}
          radius={radius * 1000} // convert km to meters
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
        />
        
        {/* Provider markers */}
        {providers.map((item) => {
          const providerPosition: [number, number] = [
            parseFloat(item.provider.latitude), 
            parseFloat(item.provider.longitude)
          ];
          
          return (
            <Marker key={item.provider.id} position={providerPosition}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{item.provider.name}</h3>
                  <p className="text-sm text-gray-600">{item.provider.address}</p>
                  <p className="text-sm text-gray-600">{item.provider.city}, {item.provider.state}</p>
                  <p className="text-xs mt-2">Distance: {item.distance.toFixed(1)} km</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;