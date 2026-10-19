import { CityTourStop, ProductItem } from '../utils/tourLogic';

// Real Location Images generated directly from authentic South Korea landmarks:
import seoulImg from '../assets/images/seoul_n_tower_1792385669126.jpg';
import busanImg from '../assets/images/busan_haeundae_beach_1792385687531.jpg';
import jejuImg from '../assets/images/jeju_seongsan_crater_1792385704184.jpg';
import gangneungImg from '../assets/images/gangneung_lighthouse_1792385719245.jpg';
import gyeongjuImg from '../assets/images/gyeongju_bulguksa_temple_1792385736214.jpg';
import yeosuImg from '../assets/images/yeosu_odongdo_breakwater_1792385751794.jpg';

// Real product images (especially authentic soft serve waffle cone ice cream on the beach):
import icecreamImg from '../assets/images/real_soft_icecream_1792385769859.jpg';
import cameraImg from '../assets/images/retro_camera_prod_1792384105973.jpg';
import chocolateImg from '../assets/images/luxury_chocolate_box_1792384122546.jpg';
import sandalsImg from '../assets/images/beach_sandals_pouch_1792384137920.jpg';

// 6 Real Location Images matching user's uploaded photos of Korea:
// 1. Seoul: N Seoul Tower & city vista (Namsan mountain & sunrise)
// 2. Busan: Haeundae beach with paddleboarders & marine city skyline
// 3. Jeju: Seongsan Ilchulbong volcanic crater & emerald ocean
// 4. Gangneung: Anmok Beach white lighthouse & East Sea promenade
// 5. Gyeongju: Bulguksa ancient stone temple stairs & twilight lanterns
// 6. Yeosu: Odongdo coastal breakwater tetrapods & romantic night ocean
export const CITY_TOUR_STOPS: CityTourStop[] = [
  {
    id: 1,
    timeSlot: '04:00 - 08:00',
    startHour: 4,
    endHour: 8,
    cityNameKo: '서울 & 인천 (Seoul & Incheon)',
    cityNameEn: 'Seoul & Incheon Sunrise',
    themeKo: '교통 & 일출 (Transportation)',
    themeEn: 'Transportation',
    headlineKo: '새벽 비행기와 N서울타워 & 인천 바다의 일출',
    headlineEn: 'Incheon Sunrise & N Seoul Tower Vista',
    descriptionKo: '※초특가※ 남산 N서울타워의 탁 트인 전경과 인천공항 서해안 바다 위로 떠오르는 찬란한 일출! 이르반 투어와 함께라면 아직 늦지 않았습니다!',
    weatherKo: '상쾌한 아침 바람 🌤️',
    weatherEn: 'Crisp Morning Breeze',
    temperature: '19°C',
    guide: 'Irvan Manurung',
    rating: 5,
    imageUrl: seoulImg,
    mapCoords: { x: 28, y: 22 },
  },
  {
    id: 2,
    timeSlot: '08:00 - 12:00',
    startHour: 8,
    endHour: 12,
    cityNameKo: '부산 해운대 & 광안리 (Busan Beach)',
    cityNameEn: 'Busan Haeundae Beach',
    themeKo: '미식 & 브런치 (Food & Beach)',
    themeEn: 'Food & Brunch',
    headlineKo: '햇빛 밑에서 열리는 조찬 모임 & 해운대 패들보드',
    headlineEn: 'Sunny Seaside Brunch & Haeundae Walk',
    descriptionKo: '탁 트인 에메랄드빛 해운대 바다를 바라보며 즐기는 특급 브런치! 고층 마린시티 빌딩과 백사장의 찬란한 아침 풍경.',
    weatherKo: '쾌청하고 따스함 ☀️',
    weatherEn: 'Sunny & Warm',
    temperature: '25°C',
    guide: 'Irvan Manurung',
    rating: 5,
    imageUrl: busanImg,
    mapCoords: { x: 74, y: 72 },
  },
  {
    id: 3,
    timeSlot: '12:00 - 16:00',
    startHour: 12,
    endHour: 16,
    cityNameKo: '제주도 성산 & 협재 (Jeju Island)',
    cityNameEn: 'Jeju Island Ocean & Ice Cream',
    themeKo: '스냅샷 & 화산 (Snapshot & Volcano)',
    themeEn: 'Beach Snapshot',
    headlineKo: '성산일출봉 분화구 & 시원한 수제 아이스크림',
    headlineEn: 'Volcanic Caldera & Handmade Ice Cream',
    descriptionKo: '제주 최고의 절경 성산일출봉과 협재 해변 출몰구역! 야자수 그늘 아래서 맛보는 달콤한 400코인 소프트 아이스크림. 막 찍어도 인생샷★',
    weatherKo: '최고로 화창한 비치 날씨 🏖️',
    weatherEn: 'Sunniest Beach Weather',
    temperature: '28°C',
    guide: 'Irvan Manurung',
    rating: 5,
    imageUrl: jejuImg,
    mapCoords: { x: 25, y: 92 },
  },
  {
    id: 4,
    timeSlot: '16:00 - 20:00',
    startHour: 16,
    endHour: 20,
    cityNameKo: '강릉 경포대 & 안목해변 (Gangneung)',
    cityNameEn: 'Gangneung Lighthouse & Coast',
    themeKo: '소셜 & 힐링 (Social & Sunset)',
    themeEn: 'Social & Sunset',
    headlineKo: '하얀 등대와 동해안 노을, 바다 전망 카페 거리',
    headlineEn: 'White Lighthouse & Seaside Cafe Walk',
    descriptionKo: '푸른 동해와 백사장에 우뚝 선 하얀 등대, 새콤달콤한 디저트와 향긋한 커피 속에서 나누는 여행자들의 진솔한 대화.',
    weatherKo: '시원한 솔바람과 황혼 🌅',
    weatherEn: 'Sunset & Cool Breeze',
    temperature: '23°C',
    guide: 'Irvan Manurung',
    rating: 5,
    imageUrl: gangneungImg,
    mapCoords: { x: 68, y: 24 },
  },
  {
    id: 5,
    timeSlot: '20:00 - 24:00',
    startHour: 20,
    endHour: 24,
    cityNameKo: '경주 불국사 & 첨성대 (Gyeongju)',
    cityNameEn: 'Gyeongju Historic Bulguksa Temple',
    themeKo: '문화유산 & 야경 (Heritage & Moonlight)',
    themeEn: 'Night Life & Heritage',
    headlineKo: '천년의 역사를 간직한 불국사 청운교 & 달빛 투어',
    headlineEn: 'Ancient Bulguksa Temple Illuminated by Night',
    descriptionKo: '유네스코 세계문화유산 불국사의 웅장한 돌계단과 전각! 은은한 전통 조명과 신비로운 천년고도 야경 속으로 떠나는 낭만 여행 🌸💖',
    weatherKo: '신비롭고 은은한 밤빛 🌙',
    weatherEn: 'Dark & Glowy Starlight',
    temperature: '20°C',
    guide: 'Irvan Manurung',
    rating: 5,
    imageUrl: gyeongjuImg,
    mapCoords: { x: 67, y: 58 },
  },
  {
    id: 6,
    timeSlot: '24:00 - 04:00',
    startHour: 0,
    endHour: 4,
    cityNameKo: '여수 오동도 방파제 & 밤바다 (Yeosu)',
    cityNameEn: 'Yeosu Romantic Midnight Ocean',
    themeKo: '자연 & 낭만 (Nature & Romance)',
    themeEn: 'Romance & Sea',
    headlineKo: '오동도 방파제 테트라포드와 여수 밤바다의 별빛 파도',
    headlineEn: 'Odongdo Breakwater & Acoustic Waves',
    descriptionKo: '이르반 투어의 시그니처 심야 코스! 웅장한 방파제 위에서 바라보는 오동도 바다 불빛과 밤하늘의 쏟아지는 별빛 아래 남기는 만점짜리 힐링.',
    weatherKo: '낭만적인 푸른 밤바다 ✨',
    weatherEn: 'Blue Hour Calm Sea',
    temperature: '18°C',
    guide: 'Irvan Manurung',
    rating: 5,
    imageUrl: yeosuImg,
    mapCoords: { x: 48, y: 76 },
  },
];

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-icecream',
    nameKo: '제주 오션 썸머 소프트 아이스크림',
    nameEn: 'Jeju Ocean Summer Soft Ice Cream',
    descriptionKo: '바삭한 수제 와플콘 위에 듬뿍 올린 진한 유기농 바닐라 & 초콜릿 트위스트 소프트 아이스크림! 해변에서 맛보는 최고의 시원함.',
    descriptionEn: 'Creamy double-twist waffle cone soft ice cream made with fresh dairy and beach sprinkles.',
    priceCoins: 400,
    originalPriceCoins: 800,
    badge: 'BEST SELLER 🍦',
    rating: 5.0,
    reviewCount: 382,
    imageUrl: icecreamImg,
    features: [
      'Made fresh daily in Jeju',
      'Crispy artisanal waffle cone with colorful sprinkles',
      'Free of Duty (이르반 면세 혜택)',
      'Unmatched Best Price (단 400 Irvan Coins)',
    ],
  },
  {
    id: 'prod-camera',
    nameKo: '이르반 레트로 일회용 필름 카메라 (27컷)',
    nameEn: 'Irvan Retro Disposable Summer Camera',
    descriptionKo: '강렬한 태양과 에메랄드빛 바다를 빈티지 감성 그대로 담아내는 레트로 필름 카메라. 플래시 내장으로 밤낮 언제나 촬영 가능!',
    descriptionEn: 'Disposable camera with built-in flash to capture unforgettable summer memories at Irvan Tour.',
    priceCoins: 400,
    originalPriceCoins: 750,
    badge: 'HOT ITEM 📸',
    rating: 5.0,
    reviewCount: 254,
    imageUrl: cameraImg,
    features: [
      'ISO 400 컬러 필름 27컷 장착',
      '강력한 내장 플래시',
      '100% Authentic Irvan Tour Edition',
      'All Sales Final Guarantee',
    ],
  },
  {
    id: 'prod-chocolate',
    nameKo: '이르반 시그니처 럭셔리 다크 초콜릿 세트',
    nameEn: 'Irvan Signature Luxury Artisan Chocolates Box',
    descriptionKo: '최고급 벨기에 카카오와 제주 감귤 가나슈가 어우러진 프리미엄 수제 하트 초콜릿 컬렉션 박스.',
    descriptionEn: 'Luxury handcrafted dark chocolate pralines presented in an elegant gold keepsake gift box.',
    priceCoins: 400,
    originalPriceCoins: 700,
    badge: 'PREMIUM 🍫',
    rating: 5.0,
    reviewCount: 199,
    imageUrl: chocolateImg,
    features: [
      '100% 순수 프리미엄 카카오 버터',
      '골드 기프트 박스 패키지 포장',
      '이르반 투어 한정판 레시피',
      '달콤 쌉싸름한 환상적인 조화',
    ],
  },
  {
    id: 'prod-beachset',
    nameKo: '이르반 썸머 비치 파우치 & 플립플랍 세트',
    nameEn: 'Irvan Summer Beach Pouch & Flip-Flops Set',
    descriptionKo: '백사장에서 돋보이는 파스텔 투톤 비치 샌들과 방수 코팅 지도 프린팅 코인 파우치 세트.',
    descriptionEn: 'Vibrant summer beach slip-ons paired with a water-resistant Korea map coin purse.',
    priceCoins: 400,
    originalPriceCoins: 650,
    badge: 'SUMMER SPECIAL 👡',
    rating: 5.0,
    reviewCount: 178,
    imageUrl: sandalsImg,
    features: [
      '미끄럼 방지 초경량 쿠션 플립플랍',
      '지퍼형 방수 코인 & 소지품 파우치',
      '비치 투어 필수 아이템',
      'Irvan Tour Exclusive Design',
    ],
  },
];

export interface TourReview {
  id: string;
  author: string;
  avatarText: string;
  avatarBg: string;
  timeAgo: string;
  rating: number;
  commentKo: string;
  commentEn: string;
  cityVisited: string;
}

export const HONEST_REVIEWS: TourReview[] = [
  {
    id: 'rev-1',
    author: 'Irvan (이르반 - 서울)',
    avatarText: 'IR',
    avatarBg: 'bg-blue-600',
    timeAgo: '2시간 전',
    rating: 5,
    commentKo: '이르반 마누룽 가이드님 덕분에 인생 최고의 대한민국 여름 여행을 즐겼습니다! 24시간 일정이 1분도 지루하지 않았고, 특히 제주도에서 먹은 소프트 아이스크림 맛은 평생 못 잊을 것 같아요! 10점 만점에 100점입니다! 🌴🍦',
    commentEn: 'So Summery 10 out of 10! Made core memories with Irvan Manurung.',
    cityVisited: '제주도 & 부산',
  },
  {
    id: 'rev-2',
    author: 'Irvan Manurung Jr.',
    avatarText: 'IM',
    avatarBg: 'bg-emerald-600',
    timeAgo: '4시간 전',
    rating: 5,
    commentKo: 'Amazing Tour Bestest Tour! 투어 가이드 이르반 마누룽의 센스와 배려가 정말 대단했습니다. 서울 일출부터 여수 밤바다까지 모든 장소가 영화 같았어요. 무조건 추천합니다!',
    commentEn: 'Amazing Tour Bestest Tour! Knowledgeable and super friendly guide.',
    cityVisited: '전국 6개 도시',
  },
  {
    id: 'rev-3',
    author: 'Irvan Traveler (여행자 이르반)',
    avatarText: 'IT',
    avatarBg: 'bg-amber-600',
    timeAgo: '8시간 전',
    rating: 5,
    commentKo: 'A Perfect day! Very well planned. 400 이르반 코인으로 면세점에서 맛있는 아이스크림이랑 레트로 카메라까지 득템했습니다. 조식 포함 티켓 가성비도 최고예요.',
    commentEn: 'A Perfect day, very well planned with 400 Irvan coins store perks!',
    cityVisited: '강릉 & 경주',
  },
  {
    id: 'rev-4',
    author: 'Irvan M. (부산 해운대)',
    avatarText: 'IB',
    avatarBg: 'bg-indigo-600',
    timeAgo: '12시간 전',
    rating: 5,
    commentKo: 'Made so many core memories! 혼자 참가했는데 이르반 마누룽 가이드님이 친절하게 사진도 수백 장 찍어주시고 잊지 못할 추억을 만들어주셨어요. 강력 추천합니다!',
    commentEn: 'Made so many core memories, would recommend to anyone!',
    cityVisited: '부산 해운대',
  },
  {
    id: 'rev-5',
    author: 'Irvan in Jeju (제주 탐험가)',
    avatarText: 'IJ',
    avatarBg: 'bg-rose-600',
    timeAgo: '1일 전',
    rating: 5,
    commentKo: 'Had the most fun in decades! 경주 불국사와 여수 오동도 방파제의 별빛 파도는 정말 환상적이었습니다. 이르반 투어 최고최고!! ⭐️⭐️⭐️⭐️⭐️',
    commentEn: 'Had the most fun in decades! The starlight beach was magical.',
    cityVisited: '경주 & 여수',
  },
  {
    id: 'rev-6',
    author: 'Irvan The Explorer',
    avatarText: 'IE',
    avatarBg: 'bg-teal-600',
    timeAgo: '2일 전',
    rating: 5,
    commentKo: '진짜 감탄만 나오는 완벽한 코스 구성입니다. 가이드 이르반 마누룽님은 도시마다 역사와 맛집을 귀에 쏙쏙 박히게 설명해주셔서 감동받았습니다. 다음 여름에도 또 예약할게요!',
    commentEn: 'Unmatched tour quality! Irvan Manurung is truly the best tour guide.',
    cityVisited: '서울 & 강릉',
  },
];
