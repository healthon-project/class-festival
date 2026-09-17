import React from 'react';
import { useUser, playAudioEffect } from '../context/UserContext';
import { User, Activity, Eye, Lightbulb, Award } from 'lucide-react';

export default function Navbar() {
  const { activeTab, setActiveTab, bodyScore, eyeQuizScore, reviewScore, activeStickerCount } = useUser();

  const tabs = [
    { id: 'login', label: '로그인', icon: User, badge: null },
    { id: 'mission', label: '미션', icon: Activity, badge: `${bodyScore}/100` },
    { id: 'quiz', label: '퀴즈', icon: Eye, badge: `${eyeQuizScore}/100` },
    { id: 'review', label: '아이디어 존', icon: Lightbulb, badge: `${reviewScore}/100` },
    { id: 'sticker', label: '스티커판', icon: Award, badge: `${activeStickerCount}개` },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-purple-500/20 px-2 py-2.5 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isStickerTab = tab.id === 'sticker';

          return (
            <button
              key={tab.id}
              onClick={() => {
                playAudioEffect('click');
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-b from-purple-600/30 to-blue-600/30 text-white border border-purple-400/40 shadow-lg shadow-purple-500/20 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-cyan-400' : ''}`} />
                {isStickerTab && activeStickerCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </div>

              {tab.badge ? (
                <span className={`text-xs font-black px-1.5 py-0.5 rounded-full my-0.5 animate-bounce ${
                  isStickerTab
                    ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border border-yellow-200 shadow-md shadow-amber-500/50'
                    : 'bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white border border-red-300 shadow-md shadow-red-500/50'
                } ${isActive ? 'ring-2 ring-yellow-300 scale-110' : ''}`}>
                  {tab.badge}
                </span>
              ) : (
                tab.id !== 'login' && <span className="text-xs opacity-0 my-0.5">.</span>
              )}
              
              <span className={`text-xs sm:text-sm font-black tracking-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
