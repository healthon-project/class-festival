import React from 'react';
import { useUser, playAudioEffect } from '../context/UserContext';
import { Sparkles, Trophy, Monitor, UserCheck, Flame } from 'lucide-react';

export default function Header() {
  const { profile, activeStickerCount, isAdminView, setIsAdminView } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-purple-500/20 px-4 py-3 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 p-0.5 shadow-md flex items-center justify-center animate-pulse-glow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
              바이브코딩 <span className="text-gradient">건강 탐험대</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">교사 수업 페스티벌 부스</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {profile.name ? (
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1">
              <span className="text-xs">{profile.avatar || '👨‍🏫'}</span>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] text-slate-400 leading-none">{profile.affiliation}</p>
                <p className="text-xs font-bold text-slate-200 leading-tight">{profile.name}</p>
              </div>
              
              <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black shadow-inner ${
                activeStickerCount > 0 
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border border-yellow-200 animate-bounce-slow' 
                  : 'bg-purple-950/80 border border-purple-500/40 text-purple-300'
              }`}>
                <Trophy className="w-3.5 h-3.5" />
                <span>누적 {activeStickerCount}개</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-purple-300 bg-purple-950/40 border border-purple-800/40 px-2.5 py-1 rounded-full">
              <UserCheck className="w-3.5 h-3.5" />
              <span>로그인 필요</span>
            </div>
          )}

          <a
            href="https://padlet.com/coral015_1/2026-48xspv3l5yzk8423"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playAudioEffect('click')}
            className="px-2.5 py-1.5 rounded-xl border text-xs font-black bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white border-pink-300 animate-bounce shadow-[0_0_15px_rgba(244,63,94,0.7)] flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
            title="패들렛 바로가기"
          >
            <span>📌</span>
            <span>패들렛</span>
          </a>

          <button
            onClick={() => {
              playAudioEffect('click');
              setIsAdminView(!isAdminView);
            }}
            title={isAdminView ? "모바일 앱으로 전환" : "부스 대형 전광판 모드"}
            className={`p-2 rounded-xl border transition-all ${
              isAdminView
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
