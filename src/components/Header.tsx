import React, { useState } from 'react';
import { ShoppingBag, Coins, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  coins: number;
  onAddBonusCoins: () => void;
  cartCount: number;
  onOpenStore: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  coins,
  onAddBonusCoins,
  cartCount,
  onOpenStore,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coinBonusCelebration, setCoinBonusCelebration] = useState(false);

  const handleClaimBonus = () => {
    onAddBonusCoins();
    setCoinBonusCelebration(true);
    setTimeout(() => setCoinBonusCelebration(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hanging Brand Card Logo (Y2K / 2010s Card Aesthetic) */}
          <div className="relative z-50 flex items-center">
            <a
              href="#top"
              className="group block bg-white border border-slate-300 rounded-b-2xl shadow-xl px-4 sm:px-6 py-2.5 -mt-2 transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                boxShadow: '0 8px 16px -2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)'
              }}
            >
              <div className="flex items-center gap-2">
                {/* Custom Vector Star Logo */}
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-amber-400 rounded-full opacity-30 group-hover:scale-125 transition-transform"></div>
                  <span className="text-2xl select-none filter drop-shadow">⭐</span>
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-700">
                      Irvan<span className="text-amber-500">Travel</span>
                    </span>
                  </div>
                  {/* Irvan VISA & Irvan AMEX partner note as requested */}
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black tracking-wider text-slate-500 uppercase -mt-0.5">
                    <span className="text-blue-800">IRVAN VISA</span>
                    <span>·</span>
                    <span className="text-sky-700">IRVAN AMEX</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links (2010s glossy hover style) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 text-xs lg:text-sm font-black text-slate-700">
            <a
              href="#tickets"
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-sky-50 transition-colors"
            >
              Tickets (티켓)
            </a>
            <a
              href="#schedule"
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-sky-50 transition-colors"
            >
              Schedule (일정)
            </a>
            <a
              href="#guide"
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-sky-50 transition-colors flex items-center gap-1"
            >
              <span>😎</span>
              <span>Tour Guides (가이드)</span>
            </a>
            <a
              href="#map"
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-sky-50 transition-colors"
            >
              Map (투어 지도)
            </a>
            <a
              href="#reviews"
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-sky-50 transition-colors"
            >
              Reviews (리뷰)
            </a>
          </nav>

          {/* Actions: Y2K Coins & Duty Free Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Irvan Coins Widget (Glossy 2010s Beveled Pill) */}
            <div className="relative flex items-center bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-300 rounded-full px-3 py-1.5 text-xs sm:text-sm font-black text-amber-900 shadow-inner">
              <Coins className="w-4 h-4 text-amber-500 mr-1.5 shrink-0" />
              <span>{coins.toLocaleString()}</span>
              <span className="ml-1 text-[11px] font-bold text-amber-700 hidden sm:inline">코인</span>

              <button
                onClick={handleClaimBonus}
                title="매일 +400 무료 코인 받기"
                className="ml-2 btn-y2k-orange rounded-full p-1 text-[10px] shadow-sm transition-transform active:scale-95"
                aria-label="무료 코인 받기"
              >
                <Sparkles className="w-3 h-3 text-white" />
              </button>

              {coinBonusCelebration && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[11px] px-2.5 py-0.5 rounded-full font-black shadow-lg animate-bounce whitespace-nowrap border border-amber-300 z-50">
                  +400 코인 지급완료! 🪙
                </span>
              )}
            </div>

            {/* Duty Free Button (Y2K Glossy Candy Green Button) */}
            <button
              onClick={onOpenStore}
              className="btn-y2k-green text-xs sm:text-sm font-black px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Irvan Duty Free (면세점)</span>
              <span className="sm:hidden">면세점</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-white text-emerald-800 text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 text-sm font-black shadow-lg">
          <a
            href="#tickets"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700"
          >
            Tickets (티켓 예매)
          </a>
          <a
            href="#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700"
          >
            Schedule (24시간 일정)
          </a>
          <a
            href="#guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700"
          >
            Tour Guides (가이드 이르반)
          </a>
          <a
            href="#map"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700"
          >
            Map (한국 투어 지도)
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700"
          >
            Reviews (정직한 후기)
          </a>
        </div>
      )}
    </header>
  );
};
