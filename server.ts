import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini if key exists
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Gemini client initialization warning:', err);
  }
}

// AI Tour Concierge endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemPrompt = `You are Guide Irvan Manurung's smart official tour assistant for "Irvan Manurung Travel" (이르반 마누룽 대한민국 썸머 비치 투어).
Key Information:
- Official Tour Guide: Irvan Manurung (이르반 마누룽). Super energetic, friendly, fun, professional guide.
- Main language: Korean (한국어). If the user asks in Indonesian or English, respond in their language or bilingual Korean/Indonesian with warm vibes.
- 24-Hour 6 Korean City Stops:
  1. 04:00 - 08:00: 서울 & 인천 (Seoul & Incheon) - 새벽 비행기와 인천 바다 일출 [교통]
  2. 08:00 - 12:00: 부산 해운대 (Busan Haeundae) - 햇빛 밑 해운대 브런치 [음식]
  3. 12:00 - 16:00: 제주도 우도 & 협재 (Jeju Island) - 에메랄드빛 해변 & 소프트 아이스크림 [스냅샷]
  4. 16:00 - 20:00: 강릉 경포대 (Gangneung) - 동해안 노을 & 카페 거리 [소셜]
  5. 20:00 - 24:00: 경주 첨성대 & 월정교 (Gyeongju) - 달빛 천년고도 야경 투어 [나이트라이프]
  6. 24:00 - 04:00: 여수 밤바다 (Yeosu Night Sea) - 별빛 파도 & 버스킹 [자연]
- Irvan Duty Free Store (면세점): All 4 featured items cost exactly 400 Irvan Coins each!
  1. 제주 오션 썸머 소프트 아이스크림 (400 코인) - Best seller!
  2. 이르반 레트로 일회용 필름 카메라 (400 코인)
  3. 이르반 시그니처 럭셔리 다크 초콜릿 세트 (400 코인)
  4. 이르반 썸머 비치 파우치 & 플립플랍 세트 (400 코인)
- Ticket options: VIP (무료 서머 프로모션), VVIP (100 코인), VVVIP (250 코인), VVVVIP (400 코인). All tickets include Breakfast (조식 포함).
- User starts with 2,400 Irvan coins and can earn +400 bonus coins with daily check-in.
Keep responses cheerful, concise, helpful, and filled with summer vacation joy and emojis (🌴🍦☀️🏖️✨).`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] },
        ],
      });
      const reply = response.text || '안녕하세요! 투어 가이드 이르반 마누룽입니다. 언제든 편하게 질문해주세요! 🌴';
      return res.json({ reply });
    } catch (err: any) {
      console.error('Gemini generation error, falling back to local engine:', err?.message || err);
    }
  }

  // Graceful rule-based local concierge response
  const lower = message.toLowerCase();
  let fallbackReply = '';

  if (lower.includes('일정') || lower.includes('코스') || lower.includes('도시') || lower.includes('schedule') || lower.includes('jadwal')) {
    fallbackReply = '📍 이르반 투어의 24시간 코스는 대한민국 6개 명소로 구성되어 있습니다!\n1. 04:00~08:00 서울/인천 일출\n2. 08:00~12:00 부산 해운대 브런치\n3. 12:00~16:00 제주도 바다 & 아이스크림\n4. 16:00~20:00 강릉 노을 카페\n5. 20:00~24:00 경주 달빛 야경\n6. 24:00~04:00 여수 낭만 밤바다 ✨';
  } else if (lower.includes('티켓') || lower.includes('예매') || lower.includes('ticket') || lower.includes('tiket')) {
    fallbackReply = '🎫 상단의 "book ticket now!" 섹션에서 여행자 이름과 출발지를 선택하고 즉시 티켓을 예매할 수 있습니다! 모든 티켓에는 맛있는 무료 조식 패키지가 포함되어 있습니다 🥞☕';
  } else if (lower.includes('아이스크림') || lower.includes('es krim') || lower.includes('ice cream')) {
    fallbackReply = '🍦 제주 오션 썸머 소프트 아이스크림은 저희 면세점의 No.1 인기 상품입니다! 가격은 단 400 이르반 코인이며, 수제 와플콘과 달콤한 유기농 트위스트로 해변 최고의 별미입니다!';
  } else if (lower.includes('코인') || lower.includes('coin') || lower.includes('면세점') || lower.includes('store') || lower.includes('toko')) {
    fallbackReply = '🪙 이르반 면세점(Irvan Duty Free)의 모든 4가지 대표 상품은 각 400 이르반 코인에 구매하실 수 있습니다! 상단 코인 충전 버튼을 누르시면 매일 400 코인을 무료 보너스로 받으실 수 있습니다 🎉';
  } else if (lower.includes('가이드') || lower.includes('이르반') || lower.includes('guide') || lower.includes('irvan')) {
    fallbackReply = '😎 안녕하세요! 저는 대한민국 최고의 썸머 비치 투어 가이드 이르반 마누룽(Irvan Manurung)입니다! 여행자 여러분께 평생 잊지 못할 푸른 바다와 신나는 추억을 만들어 드립니다!';
  } else {
    fallbackReply = `🌴 반갑습니다! 이르반 마누룽 투어 공식 AI 가이드입니다. 24시간 한국 도시 투어, 티켓 예매, 400코인 면세점 아이스크림 등 무엇이든 물어보세요! 즐거운 여름 여행 되세요 ☀️🏖️`;
  }

  return res.json({ reply: fallbackReply });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
