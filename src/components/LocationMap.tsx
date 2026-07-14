"use client";
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CONFIG } from '@/constants/data';

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapRef.current.hasChildNodes()) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: true,
        attributionControl: false
      }).setView([CONFIG.lat, CONFIG.lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

      const icon = L.divIcon({
        className: '',
        html: '<div style="width:16px;height:16px;border-radius:50%;background:#3d5e75;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      L.marker([CONFIG.lat, CONFIG.lng], { icon }).addTo(map);

      return () => { map.remove(); };
    }
  }, []);

  return <div ref={mapRef} className="w-full h-[300px] filter saturate-85 contrast-95" />;
}
