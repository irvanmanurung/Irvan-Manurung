import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShoppingBag, Star, Check, Sparkles, X, Plus, Minus, Coins, ArrowRight, ShieldCheck } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/tourData';
import { ProductItem, canAfford, deductCoins } from '../utils/tourLogic';

interface DutyFreeStoreProps {
  coins: number;
  onCoinsUpdated: (newCoins: number) => void;
  onAddBonusCoins: () => void;
}

export const DutyFreeStore: React.FC<DutyFreeStoreProps> = ({
  coins,
  onCoinsUpdated,
  onAddBonusCoins,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [purchaseSuccess, setPurchaseSuccess] = useState<{
    product: ProductItem;
    qty: number;
    totalCost: number;
    orderId: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenProduct = (prod: ProductItem) => {
    setSelectedProduct(prod);
    setQuantity(1);
    setErrorMessage('');
  };

  const handleBuyNow = (prod: ProductItem, qty: number) => {
    const totalCost = prod.priceCoins * qty;
    const res = deductCoins(coins, totalCost);

    if (!res.success) {
      setErrorMessage(res.error || '이르반 코인이 부족합니다.');
      return;
    }

    onCoinsUpdated(res.newBalance);
    const orderId = `ORD-IRV-${Math.floor(100000 + Math.random() * 900000)}`;

    setPurchaseSuccess({
      product: prod,
      qty,
      totalCost,
      orderId,
    });
    setSelectedProduct(null);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#ff8000', '#0284c7', '#facc15'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="duty-free" className="py-16 bg-white border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Promotional Duty Free Banner (Matching Screenshot 9 & Y2K 2010s Aesthetic) */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-14 bg-gradient-to-r from-sky-100 via-white to-amber-50 border border-sky-300 glossy-glass-card">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center p-8 sm:p-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 shadow-xs">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>IRVAN MANURUNG DUTY FREE 🛍️</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                IRVAN DUTY FREE <br />
                <span className="text-blue-600 font-extrabold uppercase">DEALS UP TO 50%</span>
              </h2>

              <p className="text-xs sm:text-sm font-bold text-slate-600 tracking-wider">
                100% Authentic &nbsp;|&nbsp; Free of Duty &nbsp;|&nbsp; Unmatched Best Price (전 품목 단 400 코인)
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* Y2K Blue Action Button */}
                <a
                  href="#featured-products"
                  className="btn-y2k-blue text-sm px-6 py-3.5 rounded-xl shadow-lg"
                >
                  <span>Shop Now (쇼핑하기)</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>

                {/* Y2K Orange Coin Bonus Button */}
                <button
                  onClick={onAddBonusCoins}
                  className="btn-y2k-orange text-xs px-5 py-3.5 rounded-xl shadow-lg"
                >
                  <Coins className="w-4 h-4 text-white mr-1.5" />
                  <span>현재 보유: <strong>{coins.toLocaleString()}</strong> 코인 (+400 받기)</span>
                </button>
              </div>
            </div>

            {/* Banner Right Imagery: Real Soft Ice Cream Photo */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-60 h-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform">
                <img
                  src={FEATURED_PRODUCTS[0].imageUrl}
                  alt="Summer Soft Ice Cream"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-center">
                  <div className="text-[10px] font-black text-amber-300">인기 1위 바삭 와플콘</div>
                  <div className="text-base font-black">400 Irvan Coins</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div id="featured-products" className="mb-10 text-center">
          <h3 className="text-2xl sm:text-4xl font-black text-slate-800">
            Featured Products (이르반 추천 상품 4선)
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
            모든 대표 상품을 특가 <strong>400 Irvan Coins</strong>에 만나보세요!
          </p>
        </div>

        {/* 4 Products Grid (As requested: exactly 4 products with real images, especially ice cream) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleOpenProduct(prod)}
              className="group bg-white rounded-2xl border border-slate-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              style={{
                boxShadow: '0 4px 14px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
              }}
            >
              {/* Product Photo */}
              <div className="relative aspect-square bg-slate-50 overflow-hidden p-3 flex items-center justify-center">
                <img
                  src={prod.imageUrl}
                  alt={prod.nameEn}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badge Tag */}
                <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm border border-white/20">
                  {prod.badge}
                </div>

                {/* 50% OFF Pill */}
                <div className="absolute top-5 right-5 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md border border-white">
                  50% OFF
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {prod.nameKo}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-400 line-clamp-1 mt-0.5">
                    {prod.nameEn}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {prod.descriptionKo}
                  </p>
                </div>

                {/* Pricing & Y2K Buy Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through">
                      {prod.originalPriceCoins} Coins
                    </div>
                    <div className="text-base font-black text-rose-600 flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span>{prod.priceCoins} Coins</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProduct(prod);
                    }}
                    className="btn-y2k-green text-xs px-3.5 py-2 rounded-xl"
                  >
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal (Matches Screenshot 10 & Y2K 2010s Style) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-300 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 via-sky-600 to-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-black tracking-wider uppercase">IRVAN DUTY FREE STORE</span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Photo */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md border-2 border-slate-200">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md border border-white">
                    50% SPECIAL
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedProduct.badge}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2">
                      {selectedProduct.nameKo}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{selectedProduct.nameEn}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-800 font-black">5.0 만점</span>
                    <span className="text-slate-400">({selectedProduct.reviewCount} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through block">
                        정가: {selectedProduct.originalPriceCoins * quantity} 코인
                      </span>
                      <span className="text-2xl font-black text-rose-600">
                        {selectedProduct.priceCoins * quantity}{' '}
                        <span className="text-xs text-amber-800 font-bold">Irvan Coins</span>
                      </span>
                    </div>

                    {/* Quantity Counter */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-300 p-1 shadow-inner">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="btn-y2k-silver w-7 h-7 rounded flex items-center justify-center"
                        aria-label="수량 감소"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-slate-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="btn-y2k-silver w-7 h-7 rounded flex items-center justify-center"
                        aria-label="수량 증가"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold rounded-lg flex items-center justify-between">
                      <span>⚠️ {errorMessage}</span>
                      <button
                        onClick={onAddBonusCoins}
                        className="underline text-blue-700 font-black ml-2"
                      >
                        +400 코인 받기
                      </button>
                    </div>
                  )}

                  {/* Buy Button */}
                  <button
                    onClick={() => handleBuyNow(selectedProduct, quantity)}
                    className="w-full btn-y2k-orange py-3.5 rounded-xl text-base shadow-lg"
                  >
                    <span>즉시 결제 (Buy Now) »</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Success Modal */}
      {purchaseSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-300 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner border border-emerald-300">
              ✓
            </div>
            <h3 className="text-xl font-black text-slate-900">
              결제가 정상 완료되었습니다!
            </h3>
            <p className="text-xs text-slate-600">
              <strong>{purchaseSuccess.product.nameKo}</strong> {purchaseSuccess.qty}개가
              성공적으로 주문되었습니다. 투어 현장에서 즉시 수령하세요!
            </p>

            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1.5 text-left border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">주문 번호:</span>
                <span className="font-mono font-black text-slate-800">{purchaseSuccess.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">결제 금액:</span>
                <span className="font-black text-rose-600">{purchaseSuccess.totalCost} Irvan Coins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold">수령 가이드:</span>
                <span className="font-black text-blue-700">😎 Irvan Manurung</span>
              </div>
            </div>

            <button
              onClick={() => setPurchaseSuccess(null)}
              className="w-full btn-y2k-blue py-3 rounded-xl text-sm"
            >
              확인 (Confirm)
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
