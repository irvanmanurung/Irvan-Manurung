import React, { useState } from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';

import seoulImg from '../assets/images/seoul_n_tower_1792385669126.jpg';
import busanImg from '../assets/images/busan_haeundae_beach_1792385687531.jpg';
import jejuImg from '../assets/images/jeju_seongsan_crater_1792385704184.jpg';
import gangneungImg from '../assets/images/gangneung_lighthouse_1792385719245.jpg';
import gyeongjuImg from '../assets/images/gyeongju_bulguksa_temple_1792385736214.jpg';
import yeosuImg from '../assets/images/yeosu_odongdo_breakwater_1792385751794.jpg';
import icecreamImg from '../assets/images/real_soft_icecream_1792385769859.jpg';

interface PolaroidItem {
  id: number;
  imageUrl: string;
  captionKo: string;
  captionEn: string;
  rotate: string;
}

const POLAROIDS: PolaroidItem[] = [
  {
    id: 1,
    imageUrl: seoulImg,
    captionKo: '04:00 N서울타워 & 아침 일출 🌅',
    captionEn: 'N Seoul Tower Sunrise Vista',
    rotate: '-rotate-6',
  },
  {
    id: 2,
    imageUrl: icecreamImg,
    captionKo: '제주 해변 400코인 소프트콘 🍦',
    captionEn: 'Jeju Beach Soft Ice Cream',
    rotate: 'rotate-4',
  },
  {
    id: 3,
    imageUrl: busanImg,
    captionKo: '부산 해운대 에메랄드빛 바다 🏖️',
    captionEn: 'Haeundae Beach Emerald Waves',
    rotate: '-rotate-3',
  },
  {
    id: 4,
    imageUrl: jejuImg,
    captionKo: '제주 성산일출봉 분화구 절경 ⛰️',
    captionEn: 'Seongsan Ilchulbong Volcanic Peak',
    rotate: 'rotate-6',
  },
  {
    id: 5,
    imageUrl: gangneungImg,
    captionKo: '강릉 안목해변 하얀 등대 ⛵',
    captionEn: 'Gangneung Seaside White Lighthouse',
    rotate: '-rotate-2',
  },
  {
    id: 6,
    imageUrl: gyeongjuImg,
    captionKo: '경주 불국사 천년의 달빛 청운교 🌸',
    captionEn: 'Gyeongju Historic Bulguksa Temple',
    rotate: 'rotate-5',
  },
  {
    id: 7,
    imageUrl: yeosuImg,
    captionKo: '여수 오동도 방파제 & 밤바다 불빛 ✨',
    captionEn: 'Yeosu Odongdo Midnight Breakwater',
    rotate: '-rotate-4',
  },
];

export const PolaroidGallery: React.FC = () => {
  const [likedIds, setLikedIds] = useState<number[]>([1, 2, 3]);

  const toggleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative py-16 bg-white overflow-hidden border-b border-sky-100">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial from-sky-50 via-white to-white pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 4 */}
        <div className="text-center mb-14">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800 font-sans">
              “<span className="text-sky-500">One</span> day,{' '}
              <span className="text-blue-700">Six</span> Summers”
            </h2>
            {/* Mirror Reflection Text */}
            <div
              aria-hidden="true"
              className="text-3xl sm:text-5xl font-black tracking-tight text-slate-400/20 -scale-y-100 select-none pointer-events-none -mt-4 blur-[0.6px] font-sans"
            >
              “<span className="text-sky-300/30">One</span> day,{' '}
              <span className="text-blue-600/30">Six</span> Summers”
            </div>
          </div>
          <p className="text-sm font-bold text-slate-500 mt-2">
            이르반 마누룽과 함께 담아낸 대한민국 여름날의 100% 리얼 여행 스냅샷
          </p>
        </div>

        {/* Polaroid Snapshots Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 items-center justify-items-center">
          {POLAROIDS.map((p) => {
            const isLiked = likedIds.includes(p.id);
            return (
              <div
                key={p.id}
                className={`group relative bg-white p-3.5 pb-5 rounded-xs shadow-xl border border-slate-200/90 transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl cursor-pointer ${p.rotate}`}
              >
                {/* Vintage Tape Pin on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/80 border border-amber-200/60 rotate-2 shadow-xs backdrop-blur-xs"></div>

                {/* Photo */}
                <div className="relative w-56 h-56 sm:w-60 sm:h-60 overflow-hidden bg-slate-100">
                  <img
                    src={p.imageUrl}
                    alt={p.captionEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Heart like button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(p.id);
                    }}
                    className={`absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md shadow-md transition-transform active:scale-90 ${
                      isLiked ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:text-rose-500'
                    }`}
                    aria-label="좋아요"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Caption */}
                <div className="mt-3 text-center px-1">
                  <p className="text-xs font-black text-slate-800 leading-tight">
                    {p.captionKo}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                    {p.captionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
