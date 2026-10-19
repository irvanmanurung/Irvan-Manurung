import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-slate-100 border-t border-slate-300 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Navigation Links (2010s style link bar) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-black text-blue-800">
          <a href="#tickets" className="hover:text-blue-600 underline-offset-4 hover:underline">
            Ticket (티켓)
          </a>
          <a href="#schedule" className="hover:text-blue-600 underline-offset-4 hover:underline">
            Schedule (일정)
          </a>
          <a href="#guide" className="hover:text-blue-600 underline-offset-4 hover:underline flex items-center gap-1">
            <span>😎</span>
            <span>Tour Guides (가이드)</span>
          </a>
          <a href="#map" className="hover:text-blue-600 underline-offset-4 hover:underline">
            Map (투어 지도)
          </a>
          <a href="#reviews" className="hover:text-blue-600 underline-offset-4 hover:underline">
            Reviews (리뷰)
          </a>
          <a href="#duty-free" className="text-emerald-700 hover:text-emerald-800 underline-offset-4 hover:underline">
            Irvan Duty Free (면세점)
          </a>
        </div>

        {/* Payment Partner Badges (IRVAN VISA & IRVAN AMEX & IRVAN MASTER & IRVAN PAYMENT) */}
        <div className="flex flex-wrap items-center justify-center gap-3 select-none">
          {/* 1. IRVAN VISA (with glossy shine) */}
          <div className="h-8 px-3.5 bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-900 text-white font-black text-[11px] rounded-lg flex items-center justify-center shadow-md border border-blue-400 tracking-wider relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-lg"></div>
            <span className="italic">IRVAN</span>
            <span className="ml-1 text-amber-300 font-extrabold italic">VISA</span>
          </div>

          {/* 2. IRVAN AMEX (with glossy sky blue styling) */}
          <div className="h-8 px-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 text-white font-black text-[10px] rounded-lg flex items-center justify-center shadow-md border border-sky-300 tracking-wider relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-t-lg"></div>
            <span>IRVAN</span>
            <span className="ml-1 bg-white/25 px-1 py-0.2 rounded text-[9px] text-sky-100 font-black">AMEX</span>
          </div>

          {/* 3. IRVAN MASTER */}
          <div className="h-8 px-3 bg-slate-900 text-white font-black text-[10px] rounded-lg flex items-center justify-center shadow-md border border-slate-700 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-lg"></div>
            <span className="w-3 h-3 rounded-full bg-rose-500 opacity-90 -mr-1"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 opacity-90 -ml-1"></span>
            <span className="ml-1.5 text-[9px] text-white tracking-wider">IRVAN MASTER</span>
          </div>

          {/* 4. IRVAN PAYMENT */}
          <div className="h-8 px-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-[10px] rounded-lg flex items-center justify-center shadow-md border border-emerald-400 tracking-tight relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-lg"></div>
            IRVAN PAYMENT 💳
          </div>
        </div>

        {/* Nostalgic Y2K 2010s Web Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono select-none">
          <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300 shadow-xs">
            🖥️ BEST VIEWED IN 1024x768
          </span>
          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300 shadow-xs font-bold">
            ★ WEB 2.0 VALIDATED
          </span>
          <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded border border-sky-300 shadow-xs font-bold">
            😎 IRVAN CERTIFIED 2010-2026
          </span>
        </div>

        {/* Brand Copyright */}
        <div className="text-xs text-slate-500 font-medium space-y-1 pt-2">
          <p>
            Copyright © 2026 <strong>Irvan Manurung Travel</strong>. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400">
            대한민국 24시간 썸머 비치 투어 · 총괄 투어가이드 <strong>😎 이르반 마누룽 (Irvan Manurung)</strong> · 서울 본부 & 제주 오션 센터
          </p>
        </div>
      </div>
    </footer>
  );
};
