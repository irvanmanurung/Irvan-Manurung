/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroTicketBooking } from './components/HeroTicketBooking';
import { PolaroidGallery } from './components/PolaroidGallery';
import { ScheduleSection } from './components/ScheduleSection';
import { KoreaTourMap } from './components/KoreaTourMap';
import { TourGuideSection } from './components/TourGuideSection';
import { DutyFreeStore } from './components/DutyFreeStore';
import { ReviewsSection } from './components/ReviewsSection';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { Footer } from './components/Footer';
import { INITIAL_IRVAN_COINS, TicketBooking, CityTourStop, addCoins } from './utils/tourLogic';

export default function App() {
  const [coins, setCoins] = useState<number>(INITIAL_IRVAN_COINS);
  const [bookedTickets, setBookedTickets] = useState<TicketBooking[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityTourStop | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddBonusCoins = () => {
    setCoins((prev) => addCoins(prev, 400));
    showToast('🪙 매일 출석 보너스 +400 이르반 코인이 적립되었습니다!');
  };

  const handleTicketBooked = (booking: TicketBooking) => {
    setBookedTickets((prev) => [booking, ...prev]);
    showToast(`✈️ ${booking.name}님의 [${booking.ticketType}] 탑승권이 성공적으로 발권되었습니다!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-sky-200 selection:text-sky-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-2xl border border-sky-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        coins={coins}
        onAddBonusCoins={handleAddBonusCoins}
        cartCount={bookedTickets.length}
        onOpenStore={() => scrollToSection('duty-free')}
        onOpenCart={() => scrollToSection('tickets')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Ticket Booking with Beach Atmosphere */}
        <HeroTicketBooking onTicketBooked={handleTicketBooked} />

        {/* 2. Polaroid Memories Collage (One day, Six Summers) */}
        <PolaroidGallery />

        {/* 3. 24-Hour Korean City Tour Schedule */}
        <ScheduleSection
          onSelectCityOnMap={(city) => {
            setSelectedCity(city);
          }}
        />

        {/* 4. Interactive Map of Korea Tour */}
        <KoreaTourMap
          selectedCity={selectedCity}
          onSelectCity={(city) => setSelectedCity(city)}
        />

        {/* 5. Tour Guide Spotlight: Irvan Manurung */}
        <TourGuideSection onOpenChat={() => setIsChatOpen(true)} />

        {/* 6. Irvan Duty Free Store (4 Featured Products @ 400 Coins, especially Ice Cream) */}
        <DutyFreeStore
          coins={coins}
          onCoinsUpdated={(newCoins) => setCoins(newCoins)}
          onAddBonusCoins={handleAddBonusCoins}
        />

        {/* 7. Honest Reviews (All 5 Stars, All Irvan Authors) */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive AI Travel Concierge Chatbot */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
