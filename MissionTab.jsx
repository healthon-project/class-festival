import React from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle2, Heart, Eye, Sparkles, HandsClap, UserCheck } from 'lucide-react';

export default function MissionTab() {
  const { bodyMissions, toggleBodyMission, bodyScore, setActiveTab } = useUser();

  const missions = [
    {
      id: 'walk20s',
      title: '미션 1: 만세 기지개 펴기',
      score: 20,
      icon: Sparkles,
      tone: 'purple',
    },
    {
      id: 'squats30',
      title: '미션 2: 눈 꼭 감았다 뜨기 3회',
      score: 20,
      icon: Eye,
      tone: 'cyan',
    },
    {
      id: 'balance10s',
      title: '미션 3: 앉아서 키 3cm 늘리기',
      score: 20,
      icon: UserCheck,
      tone: 'purple',
    },
    {
      id: 'water1cup',
      title: '미션 4: 옆친구에게 손하트 날리기',
      score: 20,
      icon: Heart,
      tone: 'cyan',
    },
    {
      id: 'highfive',
      title: '미션 5: 박수 10번',
      score: 20,
      icon: HandsClap,
      tone: 'purple',
    },
  ];

  return (
    <div className="max-w-md mx-auto space-y-5 pb-24 animate-fadeIn">
      <div className="glass-card rounded-3xl p-5 border border-purple-500/30 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">신체 활동 챌린지</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            ✨ 오늘의 미션 <span className="text-gradient">(100점 만점)</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1">미션당 20점씩 획득할 수 있습니다.</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            {bodyScore} <span className="text-xs sm:text-sm text-slate-400">/ 100p</span>
          </div>
          <span className="text-xs font-extrabold text-emerald-400 mt-1">
            {bodyScore === 100 ? '🎉 신체 미션 올클리어!' : `${5 - Object.values(bodyMissions).filter(Boolean).length}개 남음`}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {missions.map((m) => {
          const Icon = m.icon;
          const isDone = bodyMissions[m.id];
          const isPurpleTone = m.tone === 'purple';

          const cardStyle = isPurpleTone
            ? isDone
              ? 'border-purple-400 bg-purple-900/60 shadow-md shadow-purple-900/30'
              : 'border-purple-500/30 bg-purple-950/20 hover:border-purple-400/60 shadow-sm'
            : isDone
              ? 'border-cyan-400 bg-cyan-900/60 shadow-md shadow-cyan-900/30'
              : 'border-cyan-500/30 bg-cyan-950/20 hover:border-cyan-400/60 shadow-sm';

          const iconGradient = isPurpleTone
            ? 'from-purple-500 to-indigo-500'
            : 'from-cyan-500 to-teal-500';

          const buttonStyle = isPurpleTone
            ? isDone
              ? 'bg-purple-600 text-white border-purple-300 font-black shadow-md'
              : 'bg-purple-900/40 text-purple-200 border-purple-500/40 hover:bg-purple-600 hover:text-white'
            : isDone
              ? 'bg-cyan-600 text-white border-cyan-300 font-black shadow-md'
              : 'bg-cyan-900/40 text-cyan-200 border-cyan-500/40 hover:bg-cyan-600 hover:text-white';

          return (
            <div
              key={m.id}
              className={`glass-card rounded-2xl p-3 sm:p-4 border transition-all flex items-center justify-between gap-2 sm:gap-3 ${cardStyle}`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-md text-slate-950 font-black shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-black text-xs sm:text-sm md:text-base text-white truncate tracking-tight">
                  {m.title}
                </h3>
              </div>

              <button
                onClick={() => toggleBodyMission(m.id)}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all border shrink-0 ${buttonStyle}`}
              >
                {isDone ? '✅ 완료 (20점)' : '미완료 (20점)'}
              </button>
            </div>
          );
        })}
      </div>

      {bodyScore === 100 && (
        <div className="glass-neon rounded-2xl p-5 text-center space-y-3 animate-bounce-slow">
          <p className="text-sm sm:text-base font-black text-cyan-300">🎉 신체 미션 100점 만점 성공!</p>
          <button
            onClick={() => setActiveTab('quiz')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-sm sm:text-base shadow-lg hover:scale-105 transition-all"
          >
            다음 코스: "당신의 눈은 몇 살?" 퀴즈 가기 (100점) ➔
          </button>
        </div>
      )}
    </div>
  );
}
