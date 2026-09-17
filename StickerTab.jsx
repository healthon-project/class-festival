import React, { useEffect, useRef, useState } from 'react';
import { useUser, playAudioEffect, getLocalDateString } from '../context/UserContext';
import { Award, Sparkles, Download, Lightbulb, Heart, ShieldCheck, Camera, ExternalLink, Check, Flame, Calendar, Trophy, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

export default function StickerTab() {
  const {
    profile,
    totalScore,
    isStickerActive,
    bodyScore,
    eyeQuizScore,
    reviewScore,
    eyeQuiz,
    review,
    setActiveTab,
    expeditionLogs,
    activeStickerCount,
    currentExpeditionLevel,
    levelTitle,
    streakDays,
    totalExpeditionPoints,
    doDailyCheckIn,
    simulateNextDay,
    levelProgressPercent,
    pointsToNextLevel,
  } = useUser();

  const cardRef = useRef(null);
  const trophyRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const padletUrl = 'https://padlet.com/coral015_1/2026-48xspv3l5yzk8423';

  const todayStr = getLocalDateString();
  const isTodayCheckedIn = expeditionLogs.some(log => log.date === todayStr);

  useEffect(() => {
    if (isStickerActive || activeStickerCount > 0) {
      playAudioEffect('fanfare');
      try {
        const colors = ['#ff0055', '#ffaa00', '#00ffcc', '#0099ff', '#ff00ff', '#ffff00', '#00ff00', '#ff4500'];
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 }, colors });
      } catch (e) {}
    }
  }, [activeStickerCount]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDailyCheckInClick = () => {
    const res = doDailyCheckIn();
    showToast(res.message);
  };

  const handleSimulateNextDayClick = () => {
    if (simulateNextDay) {
      const res = simulateNextDay();
      showToast(res.message);
    }
  };

  const handleCapture = async () => {
    playAudioEffect('click');
    const target = trophyRef.current || cardRef.current;
    if (!target) return false;
    try {
      const canvas = await html2canvas(target, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${profile.name || '선생님'}_2달누적_건강탐험_수료증.png`;
      link.href = dataUrl;
      link.click();

      try {
        canvas.toBlob(async (blob) => {
          if (blob && navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          }
        });
      } catch (e) {}

      setIsCaptured(true);
      playAudioEffect('success');
      showToast('📸 누적 트로피 화면 캡처 완료! 이미지가 저장되었습니다.');
      return true;
    } catch (err) {
      console.error(err);
      setIsCaptured(true);
      showToast('📸 화면 캡처가 완료되었습니다. 다운로드 폴더를 확인해 주세요!');
      return true;
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      playAudioEffect('click');
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `${profile.name || '선생님'}_바이브코딩_건강탐험_수료증.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      alert('이미지 저장 중 오류가 발생했습니다. 화면을 캡처해 주세요!');
    }
  };

  const totalSlots = 60;
  const slots = Array.from({ length: totalSlots });

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`;
    }
    return dateStr;
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-28 animate-fadeIn relative">
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white px-4 py-2.5 rounded-2xl font-black text-xs shadow-2xl animate-bounce flex items-center gap-2 border border-yellow-200">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2달 누적 헤더 카드 */}
      <div className="glass-card rounded-3xl p-5 border border-amber-500/30 flex items-center justify-between shadow-xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider flex items-center gap-1 w-max">
            <Flame className="w-3 h-3 text-amber-400" />
            2달(60일) 무리셋 영구 누적
          </span>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>튼튼탐험대</span>
            <span className="gold-gradient">스티커판</span>
          </h2>
          <p className="text-xs text-slate-300">매일매일 리셋 없이 차곡차곡 스티커가 쌓입니다!</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-black text-amber-400 flex items-baseline gap-1">
            <span>{activeStickerCount}</span>
            <span className="text-xs text-slate-400 font-normal">/ 60개</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            🔥 {streakDays}일 연속 탐험 중
          </span>
        </div>
      </div>

      {/* 탐험가 레벨 및 총 포인트 카드 */}
      <div className="glass-card rounded-2xl p-4 border border-purple-500/30 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-pink-500 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
                🏆
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase">CURRENT RANK</span>
              <h3 className="text-sm font-black text-white">{levelTitle} (Lv.{currentExpeditionLevel})</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-cyan-300">{totalExpeditionPoints} P</div>
            <div className="text-[10px] text-slate-400">다음 레벨까지 {pointsToNextLevel}P</div>
          </div>
        </div>

        {/* 레벨 프로그레스 바 */}
        <div className="space-y-1">
          <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 오늘 스티커 쾅 찍기 버튼 */}
      <div className="glass-neon rounded-2xl p-4 border border-amber-400/50 text-center space-y-3 shadow-xl bg-gradient-to-r from-amber-950/40 via-purple-950/50 to-slate-950">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] font-bold text-amber-300">TODAY'S EXPLORATION</span>
            <h4 className="text-sm font-black text-white">오늘의 탐험 스티커 받기</h4>
          </div>
          {isTodayCheckedIn ? (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 오늘 완료!
            </span>
          ) : (
            <button
              type="button"
              onClick={handleDailyCheckInClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all border border-yellow-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>오늘 스티커 쾅 찍기!</span>
            </button>
          )}
        </div>

        {/* 내일로 이동해보기 테스트 버튼 */}
        <button
          type="button"
          onClick={handleSimulateNextDayClick}
          className="w-full py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-300 font-bold text-[10px] border border-slate-700/60 transition-all flex items-center justify-center gap-1.5"
        >
          <span>🌙 [선생님 미리보기] 자고 일어나기 테스트 (내일로 1일 이동)</span>
        </button>
      </div>

      {/* 2달(60일) 대형 누적 스티커판 Grid */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>60일 누적 탐험 스티커판</span>
          </h3>
          <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
            총 {activeStickerCount}개 스티커 보유
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {slots.map((_, idx) => {
            const isEarned = idx < expeditionLogs.length;
            const logItem = isEarned ? expeditionLogs[idx] : null;
            const dayNum = idx + 1;

            return (
              <div
                key={dayNum}
                className={`aspect-square rounded-2xl p-1.5 flex flex-col items-center justify-center text-center transition-all relative overflow-hidden border ${
                  isEarned
                    ? 'bg-gradient-to-tr from-amber-500/30 via-purple-600/40 to-cyan-500/30 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-600'
                }`}
              >
                {isEarned ? (
                  <>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-md animate-pulse">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-extrabold text-amber-300 mt-1 leading-none">
                      {formatDateDisplay(logItem?.date) || `Day ${dayNum}`}
                    </span>
                    <span className="text-[8px] font-bold text-cyan-300 leading-none mt-0.5">
                      +100P
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {dayNum}
                    </div>
                    <span className="text-[8px] font-medium text-slate-500 mt-1 leading-none">
                      미달성
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 수료증 & 트로피 캡처 카드 */}
      <div
        ref={trophyRef}
        className="rounded-3xl p-6 border transition-all text-center space-y-4 relative overflow-hidden shadow-2xl glass-neon border-amber-400/60 ring-4 ring-amber-400/20 bg-gradient-to-b from-purple-950/80 via-slate-950 to-indigo-950/90"
      >
        <div className="text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>2달 누적 건강 탐험 완주 인증 트로피</span>
        </div>

        <div className="relative inline-block my-2">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-700 bg-gradient-to-tr from-pink-500 via-amber-400 via-emerald-400 to-cyan-400 text-slate-950 shadow-[0_0_50px_rgba(236,72,153,0.8)] scale-110 rotate-6 animate-pulse">
            <Award className="w-14 h-14" />
          </div>
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-bounce border border-yellow-200">
            🎆 누적 {activeStickerCount}개 완료!
          </span>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-pink-400 via-amber-300 via-emerald-300 to-cyan-400 bg-clip-text text-transparent flex items-center justify-center gap-2 drop-shadow-md">
              <span>{levelTitle} 달성!</span>
              <span className="text-2xl animate-bounce inline-block">🎉</span>
            </h3>
            <p className="text-sm sm:text-base font-extrabold text-cyan-300">
              미션을 모두 완료하였습니다!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCapture}
              className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-lg border-2 active:scale-95 ${
                isCaptured
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 border-yellow-100 hover:scale-[1.03] shadow-[0_0_20px_rgba(245,158,11,0.5)]'
              }`}
            >
              {isCaptured ? <Check className="w-4 h-4 text-emerald-400" /> : <Camera className="w-4 h-4" />}
              <span>{isCaptured ? '캡처 완료!' : '화면 캡처하기'}</span>
            </button>

            <a
              href={padletUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playAudioEffect('click');
                if (!isCaptured) {
                  handleCapture();
                }
              }}
              className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-lg border-2 active:scale-95 ${
                isCaptured
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white border-pink-200 animate-pulse shadow-[0_0_25px_rgba(244,63,94,0.8)] scale-[1.03]'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white border-purple-400 hover:scale-[1.02]'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>패들렛에 올리기</span>
            </a>
          </div>
        </div>
      </div>

      {/* 수료증 카드리프 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            2달 누적 영구 디지털 수료증
          </h3>
          <button
            onClick={handleDownloadCard}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" /> 카드 이미지 저장
          </button>
        </div>

        <div
          ref={cardRef}
          className="rounded-3xl p-6 bg-slate-950 border-2 border-purple-500/50 shadow-2xl relative overflow-hidden space-y-4"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/20 rounded-full blur-3xl" />

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[9px] font-bold tracking-widest text-cyan-400 uppercase">OFFICIAL CERTIFICATE</span>
              <h4 className="text-lg font-black text-white">바이브코딩 건강 탐험대 수료증</h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-medium">2달 누적 탐험</span>
              <div className="text-xs font-black text-amber-400">총 {activeStickerCount}개 스티커 달성</div>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">소속 학교/기관:</span>
              <span className="font-bold text-white">{profile.affiliation || '수업 페스티벌 교사'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">성함:</span>
              <span className="font-extrabold text-cyan-300 text-sm">{profile.name || '선생님'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">탐험가 레벨:</span>
              <span className="font-bold text-amber-400">{levelTitle} (Lv.{currentExpeditionLevel})</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">총 탐험 포인트:</span>
              <span className="font-bold text-emerald-400">{totalExpeditionPoints} P</span>
            </div>
          </div>

          <div className="bg-purple-950/40 border border-purple-500/30 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-black text-purple-300 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span>AI가 생성한 [선생님 맞춤형 힐링 바이브 처방전]</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{profile.name || '선생님'}! 2달간 꾸준한 튼튼탐험대 도전에 깊이 감사드립니다. 총 {activeStickerCount}개의 스티커와 {totalExpeditionPoints}P로 건강과 열정을 멋지게 증명하셨습니다!"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 교사 수업 페스티벌 영구 누적 인증
            </span>
            <span>{new Date().toLocaleDateString('ko-KR')} 발급</span>
          </div>
        </div>
      </div>
    </div>
  );
}
