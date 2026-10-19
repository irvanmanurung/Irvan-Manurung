/**
 * Pure domain logic for Irvan Manurung Travel App
 */

export interface TicketBooking {
  id: string;
  name: string;
  from: string;
  departureDate: string;
  ticketType: 'VIP' | 'VVIP' | 'VVVIP' | 'VVVVIP';
  priceInCoins: number;
  breakfastIncluded: boolean;
  bookedAt: string;
}

export interface ProductItem {
  id: string;
  nameKo: string;
  nameEn: string;
  descriptionKo: string;
  descriptionEn: string;
  priceCoins: number;
  originalPriceCoins: number;
  badge: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  features: string[];
}

export interface CityTourStop {
  id: number;
  timeSlot: string;
  startHour: number;
  endHour: number;
  cityNameKo: string;
  cityNameEn: string;
  themeKo: string;
  themeEn: string;
  headlineKo: string;
  headlineEn: string;
  descriptionKo: string;
  weatherKo: string;
  weatherEn: string;
  temperature: string;
  guide: string;
  rating: number;
  imageUrl: string;
  mapCoords: { x: number; y: number }; // percentage coordinates on Korea map
}

export const TICKET_PRICING: Record<'VIP' | 'VVIP' | 'VVVIP' | 'VVVVIP', number> = {
  VIP: 0, // Free summer promo ticket!
  VVIP: 100,
  VVVIP: 250,
  VVVVIP: 400,
};

export const INITIAL_IRVAN_COINS = 2400;

export function canAfford(balance: number, cost: number): boolean {
  return balance >= cost && cost >= 0;
}

export function deductCoins(balance: number, cost: number): { success: boolean; newBalance: number; error?: string } {
  if (cost < 0) {
    return { success: false, newBalance: balance, error: '잘못된 금액입니다.' };
  }
  if (balance < cost) {
    return {
      success: false,
      newBalance: balance,
      error: `이르반 코인이 부족합니다. (필요: ${cost} 코인, 보유: ${balance} 코인)`,
    };
  }
  return { success: true, newBalance: balance - cost };
}

export function addCoins(balance: number, amount: number): number {
  if (amount <= 0) return balance;
  return balance + amount;
}

export function generateBookingCode(name: string, tier: string): string {
  const sanitized = (name || 'IRVAN').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'IRVN';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `IRV-${tier}-${sanitized}-${randomSuffix}`;
}

export function getActiveTourByHour(stops: CityTourStop[], hour: number): CityTourStop | undefined {
  const normalizedHour = ((hour % 24) + 24) % 24;
  return stops.find((stop) => {
    if (stop.startHour < stop.endHour) {
      return normalizedHour >= stop.startHour && normalizedHour < stop.endHour;
    }
    // Wraps midnight (e.g. 24:00 to 04:00 which is 0 to 4)
    return normalizedHour >= stop.startHour || normalizedHour < stop.endHour;
  });
}

export function calculateAverageRating(ratings: number[]): { average: number; formatted: string } {
  if (!ratings || ratings.length === 0) {
    return { average: 5.0, formatted: '5.0' };
  }
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  const avg = sum / ratings.length;
  return { average: avg, formatted: avg.toFixed(1) };
}
