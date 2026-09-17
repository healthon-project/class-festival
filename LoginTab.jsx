import React, { useState } from 'react';
import { useUser, playAudioEffect } from '../context/UserContext';
import { Sparkles, Building2, User, ArrowRight, ShieldCheck, LogOut } from 'lucide-react';

const AVATARS = [
  { emoji: '👨‍🏫', label: '바이브 교사' },
  { emoji: '👩‍💻', label: '프롬프트 마법사' },
  { emoji: '🏃‍♂️', label: '헬스 코치' },
  { emoji: '👓', label: '시력 파수꾼' },
  { emoji: '🚀', label: '미래인재' },
];

export default function LoginTab() {
  const { profile, loginUser, logoutUser, setActiveTab } = useUser();
  const [affiliation, setAffiliation] = useState(profile.affiliation || '');
  const [name, setName] = useState(profile.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || '👨‍🏫');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!affiliation.trim() || !name.trim()) {
      alert('소속과 성함을 모두 입력해 주세요!');
      return;
    }
    loginUser(affiliation.trim(), name.trim(), selectedAvatar);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24 animate-fadeIn">
      <div className="relative overflow-hidden rounded-3xl p-6 glass-neon text-center space-y-3">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-500/30 px-3 py-1 rounded-full text-xs text-purple-300 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>수업 페스티벌 바이브코딩 부스</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          탐험대원 <span className="text-gradient">프로필 등록</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          선생님의 <strong className="text-cyan-300">소속과 성함</strong>을 입력하시고<br />
          300점 만점 건강 탐험을 시작해 보세요!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 border border-purple-500/20 space-y-5 shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>소속 (학교 / 기관명) <span className="text-pink-400">*</span></span>
            </label>
            <input
              type="text"
              required
              placeholder="예: 서울초등학교, OO중학교"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-cyan-400" />
              <span>성함 <span className="text-pink-400">*</span></span>
            </label>
            <input
              type="text"
              required
              placeholder="예: 김선생님, 홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Login & Logout Buttons (Equal size, different colors) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>🔑 로그인</span>
          </button>

          <button
            type="button"
            onClick={() => {
              logoutUser();
              setAffiliation('');
              setName('');
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 text-white font-extrabold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>🚪 로그아웃</span>
          </button>
        </div>

        {profile.name && (
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              className="text-xs text-cyan-400 underline font-medium hover:text-cyan-300"
            >
              이미 저장된 프로필로 계속 진행 ➔
            </button>
          </div>
        )}
      </form>

      <div className="glass-card rounded-2xl p-4 border border-slate-800 text-xs text-slate-400 space-y-2">
        <p className="font-bold text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          탐험 300점 만점 획득 코스
        </p>
        <ul className="space-y-1 list-disc list-inside text-slate-300">
          <li><strong>신체 활동 미션</strong>: 스쿼트, 제자리걷기 등 (100점)</li>
          <li><strong>"당신의 눈은 몇 살?"</strong>: 시력 반응속도 게임 (100점)</li>
          <li><strong>수업 아이디어 & 소감</strong>: 부스 전광판 공유 (100점)</li>
          <li><strong>300점 달성시</strong>: 스티커 점등 & AI 힐링 바이브 처방전!</li>
        </ul>
      </div>
    </div>
  );
}
