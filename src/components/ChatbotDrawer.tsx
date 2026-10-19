import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const DEFAULT_QUESTIONS = [
  '📍 24시간 투어 일정 알려줘',
  '🎫 티켓 예매 방법과 조식 혜택',
  '🍦 400 코인 아이스크림 추천',
  '🪙 이르반 코인 충전 방법',
];

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '안녕하세요! 반갑습니다! 저는 대한민국 썸머 비치 투어 총괄 가이드 이르반 마누룽(Irvan Manurung)의 AI 여행 도우미입니다 🌴😎\n\n서울 일출부터 해운대 브런치, 제주도 소프트 아이스크림(400 코인), 티켓 예매까지 무엇이든 물어보세요!',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      if (res.ok) {
        const data = await res.json();
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || '답변을 불러오지 못했습니다. 다시 시도해주세요.',
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error('API request failed');
      }
    } catch {
      // Graceful local smart fallback
      let fallback = '가이드 이르반 마누룽입니다! 투어 일정, 티켓 예매, 400 코인 면세점 아이스크림에 대해 궁금한 점을 언제든 알려주세요 🏖️✨';
      const q = question.toLowerCase();
      if (q.includes('일정') || q.includes('코스') || q.includes('도시')) {
        fallback = '📍 24시간 투어 코스는 [서울/인천 일출 → 부산 해운대 브런치 → 제주도 해변 아이스크림 → 강릉 노을 카페 → 경주 달빛 야경 → 여수 낭만 밤바다]로 구성되어 있습니다!';
      } else if (q.includes('티켓') || q.includes('예매')) {
        fallback = '🎫 상단 "book ticket now!"에서 이름과 출발지를 입력 후 즉시 탑승권을 발권받을 수 있습니다. 모든 티켓에는 조식 뷔페가 포함되어 있습니다 ☕';
      } else if (q.includes('아이스크림') || q.includes('es krim')) {
        fallback = '🍦 제주 오션 썸머 소프트 아이스크림은 단 400 이르반 코인에 판매 중입니다! 바삭한 수제 와플콘과 달콤한 풍미가 일품입니다!';
      } else if (q.includes('코인')) {
        fallback = '🪙 상단 헤더의 코인 충전 버튼을 누르면 매일 400 코인을 무료 보너스로 받으실 수 있습니다!';
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: fallback,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom Right: Y2K 2010s Glossy Aqua Pill with Sunglasses Emoji 😎 */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-5 right-5 z-40 btn-y2k-blue px-4 sm:px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer border-2 border-white"
          aria-label="이르반 AI 투어 가이드와 채팅하기"
        >
          <div className="relative w-8 h-8 rounded-full bg-amber-400 border border-white shrink-0 flex items-center justify-center text-lg shadow-inner">
            <span>😎</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white animate-pulse"></span>
          </div>
          <span className="hidden sm:inline font-black text-sm text-white">이르반 가이드와 실시간 채팅</span>
          <span className="sm:hidden font-black text-xs text-white">AI 채팅</span>
        </button>
      )}

      {/* Backdrop for easy closing */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer (Y2K Skeuomorphic Glossy Card) */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-l border-slate-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header: 2010s Glossy Header with Clear X Close Button */}
        <div className="p-4 bg-gradient-to-r from-blue-700 via-sky-600 to-blue-600 text-white flex items-center justify-between border-b-2 border-blue-900 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xl shadow-inner shrink-0">
              <span>😎</span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm tracking-tight text-white">
                  Irvan AI Tour Guide (이르반 AI)
                </h3>
                <span className="bg-white/20 text-sky-100 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  2010s Live
                </span>
              </div>
              <p className="text-[11px] text-sky-100 font-medium">
                Online 🟢 (24시간 대한민국 썸머 비치 투어 상담)
              </p>
            </div>
          </div>

          {/* Prominent High-Contrast X Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 bg-black/30 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer border border-white/30"
            aria-label="채팅 닫기"
            title="닫기 (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Chips Prompts */}
        <div className="p-3 bg-sky-50 border-b border-sky-100 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-black text-sky-800 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>추천:</span>
          </span>
          {DEFAULT_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="btn-y2k-silver shrink-0 text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm shadow-xs border ${
                    isUser
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-amber-400 text-slate-900 border-amber-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <span>😎</span>}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isUser ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <span className="animate-spin">🌀</span>
              <span>이르반 가이드가 생각 중입니다...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="이르반 가이드에게 질문하세요..."
            className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 font-medium"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn-y2k-orange px-4 py-2.5 rounded-xl disabled:opacity-50 text-xs font-black shadow-sm"
            aria-label="메시지 전송"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
};
