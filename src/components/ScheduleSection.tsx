import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin, User, Sun, Waves, Sparkles, X, Volume2 } from 'lucide-react';
import { CITY_TOUR_STOPS } from '../data/tourData';
import { CityTourStop } from '../utils/tourLogic';

interface ScheduleSectionProps {
  onSelectCityOnMap: (stop: CityTourStop) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onSelectCityOnMap }) => {
  const [selectedStop, setSelectedStop] = useState<CityTourStop | null>(null);

  const handleStartTour = (stop: CityTourStop) => {
    setSelectedStop(stop);
  };

  return (
    <section id="schedule" className="py-20 bg-slate-50/70 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 3 & 5 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
            Irvan Manurung Tour <span className="text-blue-600">Schedule</span>
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-500 mt-2 max-w-2xl mx-auto">
            6 plans throughout the day, covering all 24 hours with a unique experience for each time.
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-sky-800 bg-sky-100 px-3.5 py-1 rounded-full border border-sky-200 shadow-xs">
            <span className="text-base">😎</span>
            <span>투어 가이드: 이르반 마누룽 (Irvan Manurung) 24시간 동행</span>
          </div>
        </div>

        {/* 6 Tour Schedule Cards Grid (Y2K / 2010s Cards with Real Destination Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CITY_TOUR_STOPS.map((stop) => (
            <div
              key={stop.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-300/80 flex flex-col group"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
              }}
            >
              {/* Photo Box with Real Photography */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={stop.imageUrl}
                  alt={stop.cityNameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Badge ID */}
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-black w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {stop.id}
                </div>

                {/* Weather Pill */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-black px-2.5 py-1 rounded-full shadow-md border border-slate-200">
                  {stop.weatherKo} ({stop.temperature})
                </div>

                {/* City Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1 drop-shadow-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{stop.timeSlot}</span>
                  </div>
                  <h3 className="text-xl font-black drop-shadow-md flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{stop.cityNameKo}</span>
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-black text-blue-600 mb-1 tracking-wide">
                    [{stop.themeKo}]
                  </div>
                  <h4 className="text-sm font-black text-slate-800 leading-snug">
                    {stop.headlineKo}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {stop.descriptionKo}
                  </p>
                </div>

                <div>
                  {/* Guide & 5 Stars */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <span>😎</span>
                      <span>Guide: <strong>{stop.guide}</strong></span>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
                      ))}
                    </div>
                  </div>

                  {/* Start Tour Button - 2010s Y2K Glossy Gel Blue Button */}
                  <div className="mt-4 pt-2">
                    <button
                      onClick={() => handleStartTour(stop)}
                      className="w-full btn-y2k-blue py-3 rounded-xl text-xs sm:text-sm font-black transition-all"
                    >
                      <span>Start Tour (투어 시작)</span>
                      <span className="ml-1 text-sky-200">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Tour Interactive Modal */}
      {selectedStop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            {/* Modal Image Header */}
            <div className="relative h-52 bg-slate-900">
              <img
                src={selectedStop.imageUrl}
                alt={selectedStop.cityNameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <button
                onClick={() => setSelectedStop(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-full backdrop-blur-xs transition-colors border border-white/20"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-black text-amber-300 bg-black/50 px-2.5 py-0.5 rounded-md border border-amber-300/40">
                  {selectedStop.timeSlot}
                </span>
                <h3 className="text-2xl font-black mt-1 drop-shadow-md">{selectedStop.cityNameKo}</h3>
                <p className="text-xs text-sky-200 font-semibold">{selectedStop.headlineKo}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 font-black block text-[10px] uppercase">CURRENT WEATHER</span>
                  <span className="font-bold text-slate-800">{selectedStop.weatherKo}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-black block text-[10px] uppercase">CHIEF GUIDE</span>
                  <span className="font-bold text-blue-700">😎 Irvan Manurung</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-1">
                  투어 상세 브리핑 (Tour Briefing)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedStop.descriptionKo}
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                <div className="font-bold text-amber-900 mb-1">🎁 이르반 투어 현장 특별 혜택</div>
                <ul className="text-amber-800 space-y-1 list-disc list-inside text-[11px]">
                  <li>현장 도착 시 무료 얼음 생수 & 썸머 부채 증정</li>
                  <li>이르반 면세점 소프트 아이스크림 400 코인 바우처 적용 가능</li>
                  <li>인생샷 전담 촬영 및 무료 고화질 인화 서비스</li>
                </ul>
              </div>

              {/* Action Buttons: Y2K Gel Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    onSelectCityOnMap(selectedStop);
                    setSelectedStop(null);
                    const mapEl = document.getElementById('map');
                    mapEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 btn-y2k-orange py-3 rounded-xl text-sm"
                >
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>지도에서 위치 확인 (View on Map)</span>
                </button>
                <button
                  onClick={() => setSelectedStop(null)}
                  className="btn-y2k-silver px-5 py-3 rounded-xl text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
