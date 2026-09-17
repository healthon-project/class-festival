import React, { useState } from 'react';
import { useUser, playAudioEffect } from '../context/UserContext';
import { Star, Send, Sparkles, CheckCircle2, Monitor, Wrench, BookmarkCheck, RotateCcw } from 'lucide-react';

export default function ReviewTab() {
  const { review, submitReviewData, resetReview, reviewScore, setActiveTab, profile } = useUser();

  const [toolIdea, setToolIdea] = useState(review.toolIdea || review.idea || '');
  const [pledgeKeyword, setPledgeKeyword] = useState(review.pledgeKeyword || review.boothReview || '');
  const [rating, setRating] = useState(review.rating || 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toolIdea.trim() || !pledgeKeyword.trim()) {
      alert('2가지 소감 질문에 모두 정성껏 작성해 주세요!');
      return;
    }
    submitReviewData(toolIdea.trim(), '', pledgeKeyword.trim(), rating);
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-24 animate-fadeIn">
      <div className="glass-card rounded-3xl p-5 border border-purple-500/30 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">💡 아이디어 존</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            아이디어 존 2가지 <span className="text-gradient">(100점)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">작성 시 부스 대형 전광판에 실시간 송출됩니다!</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            {reviewScore} <span className="text-xs sm:text-sm text-slate-400">/ 100p</span>
          </div>
          <span className="text-xs font-extrabold text-emerald-400 mt-1">
            {review.completed ? '🎉 100점 획득 완료!' : '작성 대기중'}
          </span>
        </div>
      </div>

      {!review.completed ? (
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 border border-purple-500/20 space-y-6 shadow-2xl">
          <div className="text-center space-y-1.5">
            <label className="block text-sm font-extrabold text-slate-200">오늘 부스 체험 만족도</label>
            <div className="flex justify-center gap-2.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => {
                    playAudioEffect('click');
                    setRating(star);
                  }}
                  className="p-1 text-3xl transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-amber-400 fill-amber-400 shadow-sm' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Question 1 */}
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />
              <span>1. 내가 만들고 싶은 수업 도구 <span className="text-pink-400">*</span></span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="예: 학생들과 역사 탐구 퀴즈 봇 만들기 프롬프트, 학급 규칙 칭찬 카드 생성기"
              value={toolIdea}
              onChange={(e) => setToolIdea(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 rounded-2xl p-4 text-base sm:text-lg text-white placeholder-slate-500 outline-none resize-none transition-all font-medium"
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 shrink-0" />
              <span>2. 오늘 나의 다짐 & 키워드 <span className="text-pink-400">*</span></span>
            </label>
            <input
              type="text"
              required
              placeholder="예: 매일 10분 바이브 코딩으로 수업 혁신하기! #바이브코딩 #건강탐험"
              value={pledgeKeyword}
              onChange={(e) => setPledgeKeyword(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 rounded-2xl px-4 py-4 text-base sm:text-lg text-white placeholder-slate-500 outline-none transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>아이디어 제출하고 100점 획득하기 ➔</span>
          </button>
        </form>
      ) : (
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">아이디어 2가지 제출 완료! (100점 획득)</h3>
            <p className="text-sm text-slate-300 mt-1">
              {profile.name} 선생님의 작성 내용이 부스 대형 전광판에 라이브로 등록되었습니다.
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-4 text-left border border-slate-800 space-y-4">
            <div>
              <div className="text-sm sm:text-base font-extrabold text-cyan-400 flex items-center gap-1">
                <span>🛠️ 1. 내가 만들고 싶은 수업 도구</span>
              </div>
              <p className="text-base sm:text-lg text-slate-100 font-bold mt-1">{review.toolIdea || review.idea}</p>
            </div>

            <div>
              <div className="text-sm sm:text-base font-extrabold text-purple-400 flex items-center gap-1">
                <span>✨ 2. 오늘 나의 다짐 & 키워드</span>
              </div>
              <p className="text-base sm:text-lg text-slate-100 font-bold mt-1">"{review.pledgeKeyword || review.boothReview}"</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => resetReview()}
              className="w-full py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-pink-500/50 transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 제출하기</span>
            </button>

            <button
              onClick={() => {
                playAudioEffect('fanfare');
                setActiveTab('sticker');
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_25px_rgba(245,158,11,0.6)] border-2 border-yellow-100 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-6 h-6 text-slate-950 animate-bounce" />
              <span>트로피 메뉴로! ➔</span>
            </button>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-400">
        <Monitor className="w-6 h-6 text-cyan-400 shrink-0" />
        <p>
          제출하신 소감은 페스티벌 현장 메인 TV 디스플레이에 <strong className="text-white">실시간 라이브 송출</strong>됩니다.
        </p>
      </div>
    </div>
  );
}
