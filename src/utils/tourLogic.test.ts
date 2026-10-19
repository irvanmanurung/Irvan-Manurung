import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canAfford,
  deductCoins,
  addCoins,
  generateBookingCode,
  calculateAverageRating,
  getActiveTourByHour,
  type CityTourStop,
} from './tourLogic.ts';

test('canAfford accurately checks balance against cost', () => {
  assert.equal(canAfford(400, 400), true);
  assert.equal(canAfford(500, 400), true);
  assert.equal(canAfford(399, 400), false);
  assert.equal(canAfford(100, -10), false);
});

test('deductCoins deducts correctly and prevents negative balance', () => {
  const purchase = deductCoins(1000, 400);
  assert.equal(purchase.success, true);
  assert.equal(purchase.newBalance, 600);

  const failedPurchase = deductCoins(200, 400);
  assert.equal(failedPurchase.success, false);
  assert.equal(failedPurchase.newBalance, 200);
  assert.match(failedPurchase.error || '', /이르반 코인이 부족합니다/);
});

test('addCoins increases balance correctly', () => {
  assert.equal(addCoins(1000, 400), 1400);
  assert.equal(addCoins(1000, 0), 1000);
  assert.equal(addCoins(1000, -50), 1000);
});

test('generateBookingCode creates valid format with tier and name prefix', () => {
  const code = generateBookingCode('Irvan Manurung', 'VVIP');
  assert.match(code, /^IRV-VVIP-IRVA-\d{4}$/);
});

test('calculateAverageRating produces accurate values', () => {
  assert.deepEqual(calculateAverageRating([]), { average: 5.0, formatted: '5.0' });
  assert.deepEqual(calculateAverageRating([5, 5, 5, 5]), { average: 5.0, formatted: '5.0' });
  const result = calculateAverageRating([5, 4, 5, 5]);
  assert.equal(result.formatted, '4.8');
});

test('getActiveTourByHour finds the corresponding city tour stop', () => {
  const mockStops: CityTourStop[] = [
    {
      id: 1,
      timeSlot: '04:00 - 08:00',
      startHour: 4,
      endHour: 8,
      cityNameKo: '서울',
      cityNameEn: 'Seoul',
      themeKo: '교통',
      themeEn: 'Transportation',
      headlineKo: '새벽 비행기',
      headlineEn: 'Dawn Flight',
      descriptionKo: '인천공항 일출',
      weatherKo: '맑음',
      weatherEn: 'Clear',
      temperature: '21°C',
      guide: 'Irvan Manurung',
      rating: 5,
      imageUrl: '',
      mapCoords: { x: 30, y: 20 },
    },
    {
      id: 2,
      timeSlot: '08:00 - 12:00',
      startHour: 8,
      endHour: 12,
      cityNameKo: '부산',
      cityNameEn: 'Busan',
      themeKo: '푸드',
      themeEn: 'Food',
      headlineKo: '해운대 브런치',
      headlineEn: 'Haeundae Brunch',
      descriptionKo: '해운대 모임',
      weatherKo: '쾌청',
      weatherEn: 'Sunny',
      temperature: '26°C',
      guide: 'Irvan Manurung',
      rating: 5,
      imageUrl: '',
      mapCoords: { x: 75, y: 70 },
    },
  ];

  const stopAt6 = getActiveTourByHour(mockStops, 6);
  assert.equal(stopAt6?.cityNameKo, '서울');

  const stopAt10 = getActiveTourByHour(mockStops, 10);
  assert.equal(stopAt10?.cityNameKo, '부산');
});
