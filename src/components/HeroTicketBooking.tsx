import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Ticket, Sparkles, Plane, X, Download, ShieldCheck, Heart } from 'lucide-react';
import { generateBookingCode, TicketBooking } from '../utils/tourLogic';

interface HeroTicketBookingProps {
  onTicketBooked: (booking: TicketBooking) => void;
}

export const HeroTicketBooking: React.FC<HeroTicketBookingProps> = ({ onTicketBooked }) => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('From My Bed');
  const [departure, setDeparture] = useState('2026. 10. 18.');
  const [ticketType, setTicketType] = useState<'VIP' | 'VVIP' | 'VVVIP' | 'VVVVIP'>('VIP');
  const [agreed, setAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTicket, setActiveTicket] = useState<TicketBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('여행자 성함을 입력해주세요 (Please enter your name).');
      return;
    }

    if (!agreed) {
      setErrorMsg('투어 약관에 동의해주세요 (Please accept the tour terms).');
      return;
    }

    const booking: TicketBooking = {
      id: generateBookingCode(name, ticketType),
      name: name.trim(),
      from,
      departureDate: departure,
      ticketType,
      priceInCoins: 0,
      breakfastIncluded: true,
      bookedAt: new Date().toLocaleTimeString('ko-KR'),
    };

    onTicketBooked(booking);
    setActiveTicket(booking);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ff8000', '#0284c7', '#16a34a', '#ec4899', '#facc15'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="tickets" className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden">
      {/* Real Tropical Beach Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Tropical Beach"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 via-sky-600/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/50 via-transparent to-white/10"></div>
      </div>

      {/* Decorative Driftwood Sign (Why Irvan Manurung) */}
      <div className="hidden lg:block absolute bottom-10 right-28 z-10 pointer-events-none select-none">
        <div className="relative transform rotate-2 hover:rotate-0 transition-transform">
          <div className="bg-[#8b5a2b] text-[#fdf6e2] font-black tracking-wide text-2xl px-8 py-3 rounded-lg shadow-2xl border-4 border-[#5c3a1b] font-serif italic text-center drop-shadow-lg">
            Why Irvan Manurung
          </div>
          {/* Wooden post */}
          <div className="w-5 h-20 bg-[#5c3a1b] mx-auto shadow-inner"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Booking Card (Matches Screenshot 6 with Y2K 2010s Glossy Styling) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="glossy-glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              {/* Header Title with Reflection Effect & Green Curve Arrow */}
              <div className="relative mb-6">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight lowercase font-serif">
                      book <span className="text-sky-500">ticket</span> now!
                    </h1>
                    {/* Mirror Reflection Text */}
                    <div
                      aria-hidden="true"
                      className="text-3xl sm:text-4xl font-black text-slate-400/20 tracking-tight lowercase font-serif -scale-y-100 select-none pointer-events-none -mt-3.5 blur-[0.6px]"
                    >
                      book <span className="text-sky-300/30">ticket</span> now!
                    </div>
                  </div>

                  {/* Green Swoosh Arrow */}
                  <div className="text-emerald-500 font-black text-4xl transform -rotate-12 select-none animate-pulse">
                    ⤹
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  이르반 마누룽과 함께하는 특별한 대한민국 썸머 비치 투어
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-2.5 bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold rounded-lg flex items-center gap-2 shadow-xs">
                  <span>⚠️</span> {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Traveler Name */}
                <div className="flex items-center gap-3">
                  <label htmlFor="traveler-name" className="w-20 text-xs sm:text-sm font-black text-slate-700">
                    Name
                  </label>
                  <input
                    id="traveler-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요 (e.g. Irvan)"
                    className="flex-1 px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white transition-all shadow-inner font-medium"
                    required
                  />
                </div>

                {/* Departure Location */}
                <div className="flex items-center gap-3">
                  <label htmlFor="from-location" className="w-20 text-xs sm:text-sm font-black text-slate-700">
                    From
                  </label>
                  <select
                    id="from-location"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white transition-all shadow-inner font-bold text-slate-800"
                  >
                    <option value="From My Bed">From My Bed (내 침대에서 출발 🛌)</option>
                    <option value="From Seoul Station">From Seoul Station (서울역 🚄)</option>
                    <option value="From Incheon Airport">From Incheon Airport (인천국제공항 ✈️)</option>
                    <option value="From Indonesia">From Indonesia (인도네시아 🇮🇩)</option>
                    <option value="From My Office">From My Office (탈출 직장 💼)</option>
                  </select>
                </div>

                {/* Departure Date */}
                <div className="flex items-center gap-3">
                  <label htmlFor="departure-date" className="w-20 text-xs sm:text-sm font-black text-slate-700">
                    Departure
                  </label>
                  <input
                    id="departure-date"
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white transition-all shadow-inner text-slate-800 font-bold"
                  />
                </div>

                {/* Ticket Types (VIP, VVIP, VVVIP, VVVVIP) */}
                <div className="pt-2">
                  <span className="block text-xs font-black text-slate-700 mb-2">Choose Ticket Type</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-black text-slate-800">
                    {(['VIP', 'VVIP', 'VVVIP', 'VVVVIP'] as const).map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                          ticketType === type
                            ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-sm ring-1 ring-sky-300'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="ticketType"
                          value={type}
                          checked={ticketType === type}
                          onChange={() => setTicketType(type)}
                          className="w-3.5 h-3.5 text-sky-600 focus:ring-sky-500"
                        />
                        <span>{type}</span>
                        {type === 'VIP' && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black ml-auto border border-emerald-200">
                            무료
                          </span>
                        )}
                        {type === 'VVVVIP' && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-black ml-auto border border-amber-300">
                            최고급
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                    />
                    <span>
                      I accepted that I love <strong className="text-blue-700">Irvan Manurung Tour</strong>.
                      <span className="block text-[11px] text-slate-500 font-normal">
                        (이르반 마누룽과 떠나는 행복한 투어 일정에 동의합니다)
                      </span>
                    </span>
                  </label>
                </div>

                {/* Buy Ticket Button - 2010s / Y2K Glossy Gel Orange Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full btn-y2k-orange py-3.5 px-6 rounded-xl text-lg tracking-wide shadow-lg transition-transform"
                  >
                    <span>Buy Ticket »</span>
                    <span className="text-xs font-bold ml-2 opacity-95">(티켓 즉시 발권)</span>
                  </button>
                  <p className="text-[11px] font-bold text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                    <span>☕</span> Breakfast Included in the package. (호화 조식 기본 포함)
                  </p>
                </div>
              </form>

              {/* 4 Trust Badges Matching Screenshot 6 & Payment Cards */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 grid grid-cols-4 gap-2 text-center select-none">
                {/* Badge 1: 100% FUN GUARANTEE */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-blue-50/90 border border-blue-200 rounded-lg shadow-xs">
                  <span className="text-[10px] font-black text-blue-800 leading-tight">100% FUN</span>
                  <span className="text-[8px] font-black text-blue-500">GUARANTEE</span>
                </div>

                {/* Badge 2: IRVAN APPROVED */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-amber-50/90 border border-amber-300 rounded-lg shadow-xs">
                  <span className="text-[10px] font-black text-amber-800 leading-tight">IRVAN</span>
                  <span className="text-[8px] font-black text-amber-600">APPROVED ✓</span>
                </div>

                {/* Badge 3: IRVAN VISA */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-gradient-to-r from-blue-700 to-indigo-900 border border-blue-500 rounded-lg shadow-xs text-white">
                  <span className="text-[9px] font-black leading-tight tracking-wider">IRVAN</span>
                  <span className="text-[8px] font-black text-amber-300 italic">VISA ✓</span>
                </div>

                {/* Badge 4: IRVAN AMEX */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-gradient-to-r from-sky-600 to-blue-700 border border-sky-400 rounded-lg shadow-xs text-white">
                  <span className="text-[9px] font-black leading-tight tracking-wider">IRVAN</span>
                  <span className="text-[8px] font-black text-sky-100">AMEX ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Slogan / Atmosphere */}
          <div className="lg:col-span-6 xl:col-span-7 text-white drop-shadow-md space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-white border border-white/30 shadow-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>대한민국 24시간 썸머 비치 투어</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              One Day, <br />
              <span className="text-amber-300 font-extrabold underline decoration-sky-300 decoration-wavy">
                Six Summers
              </span>
            </h2>
            <p className="text-base sm:text-xl font-medium text-sky-50 max-w-xl leading-relaxed drop-shadow">
              가이드 <strong className="text-white font-black underline decoration-amber-300">이르반 마누룽 (Irvan Manurung)</strong>과 함께 서울, 부산, 제주, 강릉, 경주, 여수까지!
              하루 24시간 내내 펼쳐지는 환상적인 해변과 맛있는 아이스크림의 세계로 초대합니다.
            </p>

            {/* Retro 2010s Web Stamp */}
            <div className="pt-2 flex items-center gap-3">
              <div className="bg-sky-900/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-xs font-black text-white flex items-center gap-2">
                <span className="text-xl">😎</span>
                <div>
                  <div>Chief Guide: Irvan Manurung</div>
                  <div className="text-[10px] text-amber-300 font-bold">5.0 Star Rated Ambassador</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Modal (Realistic Summer Boarding Pass) */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-600 text-white p-5 flex items-center justify-between border-b-2 border-blue-900 shadow-md">
              <div className="flex items-center gap-2.5">
                <Ticket className="w-6 h-6 text-amber-300" />
                <div>
                  <h3 className="text-lg font-black tracking-tight">IRVAN MANURUNG SUMMER BOARDING PASS</h3>
                  <p className="text-xs text-sky-100 font-medium">공식 대한민국 썸머 투어 탑승권 (Official Boarding Ticket)</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTicket(null)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Ticket Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-dashed border-slate-300 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Passenger (여행자)</span>
                  <span className="text-sm font-black text-slate-800">{activeTicket.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">From (출발지)</span>
                  <span className="text-sm font-black text-slate-800 truncate block">{activeTicket.from}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Date (출발일)</span>
                  <span className="text-sm font-black text-slate-800">{activeTicket.departureDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Tier (좌석 등급)</span>
                  <span className="text-sm font-black text-amber-600">{activeTicket.ticketType} CLASS</span>
                </div>
              </div>

              {/* Booking Reference Code & Irvan Chief Guide Signature */}
              <div className="bg-sky-50/80 p-4 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest block">
                    BOOKING REFERENCE #
                  </span>
                  <span className="text-xl font-mono font-black text-slate-800 tracking-wider">
                    {activeTicket.id}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                    ☕ Breakfast Included in package (호화 조식 포함)
                  </span>
                </div>

                {/* Sunglasses Emoji Guide Seal */}
                <div className="text-center sm:text-right flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-sky-300 shadow-xs">
                  <span className="text-3xl">😎</span>
                  <div className="text-left">
                    <span className="text-[10px] font-black text-blue-700 block uppercase">
                      CHIEF TOUR GUIDE
                    </span>
                    <span className="text-xs font-black text-slate-800">
                      Irvan Manurung
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Y2K Gel Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setActiveTicket(null)}
                  className="flex-1 btn-y2k-orange py-3 rounded-xl text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span>탑승권 저장 및 확인 (Confirm)</span>
                </button>
                <button
                  onClick={() => setActiveTicket(null)}
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
