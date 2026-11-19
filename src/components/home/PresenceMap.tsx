"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";
import { organization } from "@/data/organization";

type PresenceMapProps = {
  activeId?: string | null;
  onSelect?: (id: string) => void;
};

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export function PresenceMap({ activeId, onSelect }: PresenceMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
  const mapRef = useRef<google.maps.Map | null>(null);
  const hasFitted = useRef(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "osp-google-maps",
    googleMapsApiKey: apiKey,
  });

  const dubai = organization.locations.find((l) => l.id === "dubai");
  const activeLocation =
    organization.locations.find((l) => l.id === activeId) ?? null;

  const routes = useMemo(() => {
    if (!dubai) return [];
    return organization.locations
      .filter((l) => l.id !== "dubai")
      .map((l) => [
        { lat: dubai.lat, lng: dubai.lng },
        { lat: l.lat, lng: l.lng },
      ]);
  }, [dubai]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (hasFitted.current) return;
    const bounds = new google.maps.LatLngBounds();
    organization.locations.forEach((location) => {
      bounds.extend({ lat: location.lat, lng: location.lng });
    });
    map.fitBounds(bounds, 72);
    hasFitted.current = true;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (!mapRef.current || !activeLocation || !isLoaded) return;
    mapRef.current.panTo({
      lat: activeLocation.lat,
      lng: activeLocation.lng,
    });
    mapRef.current.setZoom(activeLocation.id === "dubai" ? 6 : 5);
  }, [activeLocation, isLoaded]);

  if (!apiKey) {
    return (
      <div className="flex h-[min(70vh,34rem)] items-center justify-center border border-navy/10 bg-cream px-6 text-center text-sm text-ink sm:h-[36rem]">
        Add{" "}
        <code className="mx-1 rounded bg-mist px-1.5 py-0.5">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        </code>{" "}
        to enable the live map.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-[min(70vh,34rem)] items-center justify-center border border-navy/10 bg-cream px-6 text-center text-sm text-ink sm:h-[36rem]">
        Google Maps failed to load. Check the API key and that Maps JavaScript
        API is enabled in Google Cloud.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[min(70vh,34rem)] items-center justify-center border border-navy/10 bg-cream text-sm text-ink sm:h-[36rem]">
        Loading map…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-navy/10">
      <div className="h-[min(70vh,34rem)] w-full sm:h-[36rem] lg:h-[38rem]">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 25.2048, lng: 55.2708 }}
          zoom={3}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            clickableIcons: false,
            styles: [
              { featureType: "poi", stylers: [{ visibility: "off" }] },
              { featureType: "transit", stylers: [{ visibility: "off" }] },
            ],
          }}
        >
          {routes.map((path, index) => (
            <PolylineF
              key={index}
              path={path}
              options={{
                strokeColor: "#C8871F",
                strokeOpacity: 0.8,
                strokeWeight: 2.5,
                geodesic: true,
              }}
            />
          ))}

          {organization.locations.map((location) => {
            const isHq = location.id === "dubai";
            const isActive = activeId === location.id;
            return (
              <MarkerF
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                title={`${location.name} — ${location.role}`}
                onClick={() => onSelect?.(location.id)}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: isActive ? 12 : 10,
                  fillColor: isHq ? "#C8871F" : "#163A5C",
                  fillOpacity: 1,
                  strokeColor: "#FBF8F5",
                  strokeWeight: 3,
                }}
              />
            );
          })}

          {activeLocation ? (
            <InfoWindowF
              position={{
                lat: activeLocation.lat,
                lng: activeLocation.lng,
              }}
              options={{ pixelOffset: new google.maps.Size(0, -16) }}
            >
              <div style={{ padding: "2px 4px", maxWidth: 220 }}>
                <strong style={{ color: "#163A5C", fontSize: 14 }}>
                  {activeLocation.name}
                </strong>
                <div style={{ color: "#0F4C6E", fontSize: 12, marginTop: 2 }}>
                  {activeLocation.role}
                </div>
              </div>
            </InfoWindowF>
          ) : null}
        </GoogleMap>
      </div>
    </div>
  );
}
