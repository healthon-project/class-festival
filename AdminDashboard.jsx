import React, { useState } from 'react';
import { useUser, playAudioEffect } from '../context/UserContext';
import { Monitor, QrCode, Sparkles, Trophy, Users, Heart, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  const { allReviews, setIsAdminView } = useUser();
  const [showQRModal, setShowQRModal] = useState(false);

  const mainUrl = window.location.href.split('?')[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 space-y-6 max-w-5xl mx-auto animate-fadeIn">
      <div className="glass-neon rounded-3xl p-6 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-0.5 shadow-lg flex items-center justify-center animate-pulse-glow">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Monitor className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="text-xs font-black text-cyan-400 tracking-widest uppercase">BOOTH LIVE DASHBOARD</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              바이브코딩 건강 탐험대 <span className="text-gradient">실시간 전광판</span>
            </h1>
            <p className="text-xs text-slate-300">교사 수업 페스티벌 현장 실시간 소감 & 아이디어 피드</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playAudioEffect('click');
              setShowQRModal(true);
            }}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>부스 QR코드 화면 띄우기</span>
          </button>

          <button
            onClick={() => {
              playAudioEffect('click');
              setIsAdminView(false);
            }}
            className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>모바일 앱 모드로 복귀</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-purple-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold">오늘 참여 선생님</p>
            <h3 className="text-2xl font-black text-white">{allReviews.length + 12}명</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold">300점 스티커 완주 교사</p>
            <h3 className="text-2xl font-black text-amber-400">{allReviews.length + 9}명 (92%)</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-pink-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold">평균 부스 만족도</p>
            <h3 className="text-2xl font-black text-pink-400">4.9 / 5.0 ⭐</h3>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            선생님들의 실시간 수업 아이디어 & 부스 한줄 소감
          </h2>
          <span className="text-xs text-slate-400">자동 실시간 롤링 업데이트 중</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allReviews.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">👨‍🏫</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-cyan-300">{item.name}</h3>
                    <p className="text-[10px] text-slate-400">{item.affiliation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {item.score}점 완주
                  </span>
                  <p className="text-[9px] text-slate-500 mt-0.5">{item.date}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="font-bold text-cyan-300 flex items-center gap-1">
                    <span>🛠️ 만들고 싶은 수업 도구:</span>
                  </div>
                  <p className="text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-medium mt-0.5">
                    {item.toolIdea || item.idea}
                  </p>
                </div>

                <div>
                  <div className="font-bold text-purple-300 flex items-center gap-1">
                    <span>✨ 오늘 나의 다짐 & 키워드:</span>
                  </div>
                  <p className="text-slate-300 font-medium italic mt-0.5">
                    "{item.pledgeKeyword || item.review}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-neon rounded-3xl p-8 max-w-sm w-full text-center space-y-5 border border-cyan-400/40 shadow-2xl relative animate-fadeIn">
            <h3 className="text-xl font-black text-white">📱 스마트폰으로 QR을 찍으세요!</h3>
            <p className="text-xs text-slate-300">
              스마트폰 카메라를 대면 별도 설치 없이<br />
              <strong className="text-cyan-300">바이브코딩 건강 탐험대</strong> 앱이 바로 열립니다.
            </p>

            <div className="w-56 h-56 bg-white rounded-2xl mx-auto p-4 flex flex-col items-center justify-center shadow-2xl border-4 border-cyan-400">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mainUrl)}`}
                alt="Booth QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[11px] font-mono text-cyan-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800 truncate">
              {mainUrl}
            </p>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
