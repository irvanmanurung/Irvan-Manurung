import React from 'react';
import { Award, Heart, MessageSquare, CheckCircle, Sparkles, MapPin, Globe } from 'lucide-react';

interface TourGuideSectionProps {
  onOpenChat: () => void;
}

export const TourGuideSection: React.FC<TourGuideSectionProps> = ({ onOpenChat }) => {
  return (
    <section id="guide" className="py-20 bg-gradient-to-b from-white via-sky-50 to-white border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 text-xs font-black px-3.5 py-1 rounded-full mb-3 border border-blue-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>대한민국 대표 공식 썸머 투어가이드 (Chief Tour Guide)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800">
            Meet Your Chief Guide: <span className="text-blue-600">Irvan Manurung</span>
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-500 mt-2">
            이르반 마누룽 가이드와 함께 떠나는 유쾌하고 에너지 넘치는 대한민국 썸머 비치 투어!
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 glossy-glass-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Guide Avatar: Emoji with Sunglasses as explicitly instructed: "foto profil nya guide nya itu emoji aja lah buat yang pakai kacamata" */}
            <div className="md:col-span-5 text-center flex flex-col items-center">
              <div className="relative group">
                {/* 2010s Glossy Sunburst Ring */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 via-orange-300 to-sky-400 rounded-full blur-xs opacity-80 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl bg-gradient-to-b from-amber-100 via-sky-50 to-amber-200 flex flex-col items-center justify-center select-none">
                  {/* Glossy highlight arch */}
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-white/50 rounded-t-full pointer-events-none"></div>
                  
                  {/* Sunglasses Emoji */}
                  <span className="text-8xl sm:text-9xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                    😎
                  </span>
                  <div className="flex gap-1.5 text-lg -mt-2">
                    <span>🌴</span>
                    <span>☀️</span>
                    <span>🏖️</span>
                  </div>
                </div>

                {/* Verified Tour Guide Badge */}
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white p-2.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-800 mt-5">
                Irvan Manurung (이르반 마누룽)
              </h3>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mt-0.5">
                Chief Tour Director & Summer Ambassador 😎
              </p>

              {/* Rating Seal */}
              <div className="mt-3 inline-flex items-center gap-1 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-xs font-black text-amber-900 shadow-xs">
                <span>⭐️⭐️⭐️⭐️⭐️ 5.0 만점</span>
                <span className="text-slate-400">·</span>
                <span>리뷰 수억 건 돌파</span>
              </div>
            </div>

            {/* Guide Description & Philosophy */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-sky-50/90 p-5 rounded-2xl border border-sky-200 shadow-inner">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                  “안녕하세요! 대한민국 최고의 여름 해변과 도시 투어를 이끄는 가이드 <strong>이르반 마누룽(Irvan Manurung)</strong>입니다!
                  새벽의 남산 N서울타워 일출부터 제주도의 달콤한 400코인 소프트 아이스크림, 그리고 여수 오동도 방파제 밤바다의 별빛 파도까지!
                  모든 여행자 분들의 가슴속에 평생 남을 찬란한 여름날의 추억을 선물해 드리겠습니다 🏖️😎”
                </p>
              </div>

              {/* Guide Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-0.5">
                    <Globe className="w-4 h-4 text-sky-500" />
                    <span>사용 가능 언어</span>
                  </div>
                  <p className="text-slate-600 text-[11px] font-medium">한국어, Bahasa Indonesia, English</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-0.5">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>투어 관할 지역</span>
                  </div>
                  <p className="text-slate-600 text-[11px] font-medium">서울, 부산, 제주, 강릉, 경주, 여수</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24시간 전 코스 100% 안전 동행 및 인생샷 전담 촬영</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>이르반 면세점(Duty Free) 전 품목 400 코인 특가 혜택 안내</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>실시간 1:1 AI 챗봇을 통한 언제 어디서나 즉각적인 상담</span>
                </div>
              </div>

              {/* Chat with Irvan Button - Y2K 2010s Glossy Gel Style */}
              <div className="pt-2">
                <button
                  onClick={onOpenChat}
                  className="w-full sm:w-auto btn-y2k-blue px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>이르반 가이드와 실시간 채팅하기 (Ask Irvan AI 😎)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
