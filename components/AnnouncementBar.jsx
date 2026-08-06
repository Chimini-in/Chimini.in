"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function AnnouncementBar() {
  const { announcements } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!announcements || announcements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="announcement-bar" id="announcementBar">
      <div 
        className="announcement-slider" 
        id="announcementSlider"
        style={{ transform: `translateY(-${currentIdx * 16}px)` }}
      >
        {announcements.map((text, idx) => (
          <div key={idx} className="announcement-slide">{text}</div>
        ))}
      </div>
    </div>
  );
}
