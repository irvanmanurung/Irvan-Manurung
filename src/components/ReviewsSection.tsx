import React, { useState } from 'react';
import { Star, MessageCircle, Plus, CheckCircle2, X } from 'lucide-react';
import { HONEST_REVIEWS, TourReview } from '../data/tourData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<TourReview[]>(HONEST_REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('Irvan (이르반)');
  const [userComment, setUserComment] = useState('');
  const [cityVisited, setCityVisited] = useState('제주도 & 부산');
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev: TourReview = {
      id: `rev-${Date.now()}`,
      author: authorName.startsWith('Irvan') ? authorName : `Irvan (${authorName})`,
      avatarText: 'IR',
      avatarBg: 'bg-amber-600',
      timeAgo: '방금 전',
      rating: 5, // All 5 stars as requested!
      commentKo: userComment.trim(),
      commentEn: 'Amazing summer tour experience with Irvan Manurung!',
      cityVisited,
    };

    setReviews([newRev, ...reviews]);
    setUserComment('');
    setIsWriteModalOpen(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 1 */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Overlapping Chat Bubble Icons (Screenshot 1) */}
              <div className="relative w-12 h-10">
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-sky-400 text-white flex items-center justify-center text-xs shadow-md border-2 border-white">
                  💬
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-lime-400 text-white flex items-center justify-center text-xs shadow-md border-2 border-white">
                  🗨️
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Honest Reviews (정직한 후기)
              </h2>
            </div>

            {/* Average Rating line */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Average Rating:
              </span>
              <span className="text-2xl font-black text-slate-900">5.0</span>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current drop-shadow-xs" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-400">
                (수억 명의 여행객 / hundreds of millions)
              </span>
            </div>
          </div>

          {/* Write Review Button - Y2K Silver Button */}
          <div>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="btn-y2k-silver text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              <span>리뷰 작성하기 (Write Review)</span>
            </button>
          </div>
        </div>

        {submittedToast && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>이르반 리뷰가 성공적으로 등록되었습니다! (별점 5점 ⭐⭐⭐⭐⭐)</span>
          </div>
        )}

        {/* 6 Review Cards Grid (Screenshot 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              style={{
                boxShadow: '0 3px 10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)'
              }}
            >
              <div className="space-y-3">
                {/* 5 Yellow Stars (Screenshot 1) */}
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-sm font-bold text-slate-800 leading-snug">
                  “{rev.commentKo}”
                </p>

                <div className="text-[11px] font-semibold text-slate-500">
                  방문 도시: <strong className="text-sky-700">{rev.cityVisited}</strong>
                </div>
              </div>

              {/* Author & Avatar */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm border border-white`}
                >
                  {rev.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-tight">
                    {rev.author}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {rev.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-black text-slate-800">
                이르반 투어 5성급 후기 작성
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  작성자 이름 (Irvan 계열)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  참여한 투어 도시
                </label>
                <select
                  value={cityVisited}
                  onChange={(e) => setCityVisited(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                >
                  <option value="제주도 & 부산">제주도 & 부산 (Jeju & Busan)</option>
                  <option value="서울 & 강릉">서울 & 강릉 (Seoul & Gangneung)</option>
                  <option value="경주 & 여수">경주 & 여수 (Gyeongju & Yeosu)</option>
                  <option value="대한민국 6대 도시 전체">대한민국 6대 도시 24시간 풀코스</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  투어 후기 내용 (가이드 이르반 마누룽 칭찬)
                </label>
                <textarea
                  rows={4}
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="이르반 마누룽 가이드님과 함께한 즐거운 여름 여행 후기를 남겨주세요!"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  required
                />
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs font-black bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <span>평점: ⭐️⭐️⭐️⭐️⭐️ 5.0 만점 고정!</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 btn-y2k-orange py-3 rounded-xl text-sm font-black"
                >
                  후기 등록하기 (Submit Review)
                </button>
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="btn-y2k-silver px-5 py-3 rounded-xl text-sm"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
