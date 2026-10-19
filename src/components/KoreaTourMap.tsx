import React, { useState } from 'react';
import { MapPin, Compass, Sun, CloudSun, Moon, Sparkles, User, Navigation } from 'lucide-react';
import { CITY_TOUR_STOPS } from '../data/tourData';
import { CityTourStop } from '../utils/tourLogic';

interface KoreaTourMapProps {
  selectedCity: CityTourStop | null;
  onSelectCity: (city: CityTourStop) => void;
}

export const KoreaTourMap: React.FC<KoreaTourMapProps> = ({ selectedCity, onSelectCity }) => {
  const [activePinId, setActivePinId] = useState<number>(selectedCity?.id || 1);

  const activeStop = CITY_TOUR_STOPS.find((s) => s.id === activePinId) || CITY_TOUR_STOPS[0];

  const pinColors: Record<number, { bg: string; text: string; ring: string }> = {
    1: { bg: 'bg-cyan-500', text: 'text-white', ring: 'ring-cyan-300' },
    2: { bg: 'bg-amber-400', text: 'text-slate-900', ring: 'ring-amber-200' },
    3: { bg: 'bg-lime-500', text: 'text-white', ring: 'ring-lime-300' },
    4: { bg: 'bg-slate-400', text: 'text-white', ring: 'ring-slate-300' },
    5: { bg: 'bg-pink-500', text: 'text-white', ring: 'ring-pink-300' },
    6: { bg: 'bg-purple-600', text: 'text-white', ring: 'ring-purple-300' },
  };

  return (
    <section id="map" className="py-20 bg-white border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 2 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
            <span className="text-blue-600">Map</span> of Irvan Tour
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-500 mt-2">
            Take a Peek at the Korea Tour Map (대한민국 6대 도시 투어 지도)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Location List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-sm font-black text-slate-500 uppercase tracking-wider mb-2 px-1">
              Tour Locations & Guide (이르반 투어 도시 목록)
            </div>

            {CITY_TOUR_STOPS.map((stop) => {
              const isActive = stop.id === activePinId;
              const color = pinColors[stop.id] || pinColors[1];

              return (
                <div
                  key={stop.id}
                  onClick={() => {
                    setActivePinId(stop.id);
                    onSelectCity(stop);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-sky-50 border-sky-400 shadow-md ring-2 ring-sky-300/50'
                      : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  style={{
                    boxShadow: isActive ? '0 4px 12px rgba(2, 132, 199, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Number Pin Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-md border-2 border-white ${color.bg} ${color.text}`}
                    >
                      {stop.id}
                    </div>

                    <div>
                      <h4 className="text-base font-black text-slate-800">
                        {stop.cityNameKo}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Tour at {stop.timeSlot} · Guide: <strong className="text-blue-700">😎 {stop.guide}</strong>
                      </p>
                      <div className="text-[11px] text-slate-600 font-semibold mt-0.5 flex items-center gap-1.5">
                        <span>{stop.weatherKo}</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-sky-600 font-bold">{stop.temperature}</span>
                      </div>
                    </div>
                  </div>

                  {/* Orange Tour Now Button - 2010s / Y2K Glossy Gel Orange Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePinId(stop.id);
                      onSelectCity(stop);
                    }}
                    className="shrink-0 btn-y2k-orange text-xs font-black px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Tour Now
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Stylized Curled Map of South Korea with Real Photo Preview */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#38bdf8] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden border-4 border-white">
              {/* Paper Curl in Top Right Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[64px] border-t-white border-l-[64px] border-l-transparent drop-shadow-md"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-b-[60px] border-b-slate-200 border-r-[60px] border-r-transparent"></div>
              </div>

              {/* Water Waves & Compass Details */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10,40 Q40,30 70,40 T130,40" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M200,80 Q230,70 260,80 T320,80" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M40,380 Q70,370 100,380 T160,380" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M260,420 Q290,410 320,420 T380,420" fill="none" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              {/* Compass Rose (Bottom Left) */}
              <div className="absolute bottom-6 left-6 pointer-events-none select-none text-sky-950/60 flex flex-col items-center">
                <Compass className="w-12 h-12" />
                <span className="text-[10px] font-black tracking-widest mt-1">N · S · E · W</span>
              </div>

              {/* Ocean Typography: IRVAN TOUR OCEAN */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-sky-950/40 font-black tracking-[0.3em] text-xs sm:text-sm select-none pointer-events-none uppercase">
                IRVAN TOUR OCEAN 🌊
              </div>

              {/* South Korea Peninsula Map SVG Surface */}
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full drop-shadow-xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer glow around peninsula */}
                  <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0284c7" floodOpacity="0.4" />
                  </filter>

                  {/* Mainland Korea Landmass */}
                  <path
                    d="M 120,40 
                       C 180,30 220,50 240,60 
                       C 270,75 300,100 290,140 
                       C 285,170 310,210 295,250 
                       C 285,280 300,310 280,350 
                       C 260,390 220,410 180,410 
                       C 140,410 110,380 120,330 
                       C 130,290 100,260 90,220 
                       C 80,180 95,140 90,110 
                       C 85,80 90,50 120,40 Z"
                    fill="#fef3c7"
                    stroke="#d97706"
                    strokeWidth="3"
                    filter="url(#mapGlow)"
                  />

                  {/* Jeju Island */}
                  <ellipse
                    cx="120"
                    cy="450"
                    rx="32"
                    ry="18"
                    fill="#fef3c7"
                    stroke="#d97706"
                    strokeWidth="2.5"
                  />

                  {/* Ullengdo / Dokdo */}
                  <circle cx="350" cy="190" r="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <circle cx="375" cy="205" r="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />

                  {/* Route dashed path connecting 1 -> 2 -> 3 -> 4 -> 5 -> 6 */}
                  <path
                    d="M 135,110 Q 230,200 270,330 Q 180,410 120,450 Q 240,320 260,110 Q 240,240 250,280 Q 200,320 185,360"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                    opacity="0.6"
                  />
                </svg>

                {/* City Pins on Map */}
                {/* 1. Seoul & Incheon */}
                <div
                  onClick={() => {
                    setActivePinId(1);
                    onSelectCity(CITY_TOUR_STOPS[0]);
                  }}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: '22%', left: '30%' }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-cyan-300">
                      1
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-200">
                      서울 & 인천
                    </span>
                  </div>
                </div>

                {/* 2. Busan */}
                <div
                  onClick={() => {
                    setActivePinId(2);
                    onSelectCity(CITY_TOUR_STOPS[1]);
                  }}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: '65%', left: '68%' }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-black text-xs flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-amber-200">
                      2
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-200">
                      부산 해운대
                    </span>
                  </div>
                </div>

                {/* 3. Jeju Island */}
                <div
                  onClick={() => {
                    setActivePinId(3);
                    onSelectCity(CITY_TOUR_STOPS[2]);
                  }}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: '88%', left: '26%' }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-lime-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-lime-300">
                      3
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-200">
                      제주도 성산
                    </span>
                  </div>
                </div>

                {/* 4. Gangneung */}
                <div
                  onClick={() => {
                    setActivePinId(4);
                    onSelectCity(CITY_TOUR_STOPS[3]);
                  }}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: '22%', left: '66%' }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-slate-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-slate-300">
                      4
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-200">
                      강릉 경포대
                    </span>
                  </div>
                </div>

                {/* 5. Gyeongju */}
                <div
                  onClick={() => {
                    setActivePinId(5);
                    onSelectCity(CITY_TOUR_STOPS[4]);
                  }}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: '56%', left: '64%' }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-pink-300">
                      5
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-200">
                      경주 불국사
                    </span>
                  </div>
                </div>

                {/* 6. Yeosu */}
                <div
                  onClick={() => {
                    setActivePinId(6);
                    onSelectCity(CITY_TOUR_STOPS[5]);
                  }}
                  className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                  style={{ top: '72%', left: '44%' }}
                >
                  <div className="relative flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-purple-300">
                      6
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mt-0.5 border border-slate-200">
                      여수 밤바다
                    </span>
                  </div>
                </div>
              </div>

              {/* Real Snapshot Preview Card of Active City */}
              <div className="mt-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white flex items-center gap-3">
                <img
                  src={activeStop.imageUrl}
                  alt={activeStop.cityNameEn}
                  className="w-16 h-16 rounded-lg object-cover shadow-xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-sky-600 uppercase">
                    Stop #{activeStop.id} · {activeStop.timeSlot}
                  </div>
                  <h5 className="text-sm font-black text-slate-800 truncate">
                    {activeStop.cityNameKo}
                  </h5>
                  <p className="text-[11px] text-slate-500 truncate font-medium">
                    {activeStop.headlineKo}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-blue-700 block">😎 {activeStop.guide}</span>
                  <span className="text-[10px] font-bold text-amber-500">⭐️ 5.0 Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
