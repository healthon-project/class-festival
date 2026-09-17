import React, { useState } from 'react';
import { useUser, playAudioEffect } from '../context/UserContext';
import { Zap, Award, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

const questionsData = [
  {
    title: "[1단계: 초성 뇌 자극]",
    question: "아래 초성이 뜻하는 단어는?",
    banner: <div className="text-3xl font-black tracking-widest text-cyan-300 bg-slate-900/90 py-3 rounded-2xl border border-cyan-500/40 text-center">ㅂ ㄱ ㄱ ㅇ</div>,
    options: [
      { text: "① 바구니옷", isCorrect: false },
      { text: "② 보라가방", isCorrect: false },
      { text: "③ 보건교육", isCorrect: true },
      { text: "④ 바른건강", isCorrect: false },
    ],
    answerText: "③ 보건교육",
    explanation: "초성 ㅂ(보) ㄱ(건) ㄱ(교) ㅇ(육)을 조합하면 학생들의 건강과 안전을 지키는 '보건교육'이 완성됩니다."
  },
  {
    title: "[2단계: 시각 인지 스트룹 훈련]",
    question: "글자의 잉크 색깔과 의미가 똑같이 일치하는 하나는?",
    options: [
      { text: "① 파랑", isCorrect: false, colorClass: "text-red-500" },
      { text: "② 노랑", isCorrect: false, colorClass: "text-purple-400" },
      { text: "③ 초록", isCorrect: true, colorClass: "text-emerald-400" },
      { text: "④ 빨강", isCorrect: false, colorClass: "text-blue-400" },
    ],
    answerText: "③ 초록",
    explanation: "글자 '초록'은 실제로 🟢 초록색 잉크로 칠해져 있어 단어 의미와 글자 잉크 색상이 정확히 일치합니다."
  },
  {
    title: "[3단계: 넌센스 뇌 자극]",
    question: "세상에서 가장 지루한 중학교는?",
    banner: <div className="text-3xl font-black text-amber-300 bg-slate-900/90 py-3 rounded-2xl border border-amber-500/40 flex justify-center items-center gap-3"><span>💻</span><span>⏳</span><span>❓</span></div>,
    options: [
      { text: "① 부재중", isCorrect: false },
      { text: "② 로딩중", isCorrect: true },
      { text: "③ 공사중", isCorrect: false },
      { text: "④ 통화중", isCorrect: false },
    ],
    answerText: "② 로딩중",
    explanation: "인터넷 화면이 지루하게 대기 중일 때 뜨는 '로딩 중(Loading...)'을 언어 유희로 표현한 넌센스 퀴즈입니다."
  },
  {
    title: "[4단계: 미래 수업 비전]",
    question: "'선생님의 열정' + '학생의 참여'가 만났을 때 일어나는 궁극적인 변화는?",
    banner: <div className="text-lg sm:text-xl font-black text-amber-300 bg-slate-900/90 py-3.5 px-3 rounded-2xl border border-amber-500/40 text-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">🔥 선생님의 열정 ➕ 🙋‍♀️ 학생의 참여 = ❓</div>,
    options: [
      { text: "① 단순 지식 암기", isCorrect: false },
      { text: "② 배움이 즐거운 성장 중심 수업", isCorrect: true },
      { text: "③ 야간 자율학습 강화", isCorrect: false },
      { text: "④ 시험 점수 줄 세우기", isCorrect: false },
    ],
    answerText: "② 배움이 즐거운 성장 중심 수업",
    explanation: "교사의 열정과 학생의 적극적인 참여가 만났을 때 배움이 즐거운 성장 중심의 미래 수업이 펼쳐집니다."
  },
  {
    title: "[5단계: 뇌 청춘 최종선언]",
    question: "보건교육과 코딩의 시너지는?",
    options: [
      { text: "① 어려운 코딩 포기하기", isCorrect: false },
      { text: "② 🚀 자연어 프롬프트로 기발한 수업 도구 즉시 완성하기", isCorrect: true },
    ],
    answerText: "② 🚀 자연어 프롬프트로 기발한 수업 도구 즉시 완성하기",
    explanation: "보건교육과 바이브 코딩이 만나면 AI 프롬프트만으로 나만의 기발한 건강 수업 앱을 즉시 만들 수 있습니다."
  }
];

export default function QuizTab() {
  const { brainQuiz, completeBrainQuiz, resetBrainQuiz, brainQuizScore, setActiveTab } = useUser();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongIndices, setWrongIndices] = useState([]);
  const [isCorrectSolved, setIsCorrectSolved] = useState(false);

  const currentQ = questionsData[step];

  const handlePickOption = (idx, isCorrect) => {
    if (isCorrectSolved) return;

    if (isCorrect) {
      playAudioEffect('success');
      setIsCorrectSolved(true);
      setScore((s) => s + 20);
    } else {
      playAudioEffect('wrong');
      if (!wrongIndices.includes(idx)) {
        setWrongIndices((prev) => [...prev, idx]);
      }
    }
  };

  const handleNextStep = () => {
    if (!isCorrectSolved) return;

    setIsCorrectSolved(false);
    setWrongIndices([]);

    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      let levelGrade = '👑 뇌 청춘 S급 (뇌 연령 10대 슈퍼 브레인!)';
      if (score < 80) levelGrade = '🧠 뇌 활력 A급 (뇌 연령 20대!)';
      if (score < 60) levelGrade = '👍 뇌 건강 B급 (뇌 활성 진행 중!)';
      completeBrainQuiz(score, levelGrade);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setScore(0);
    setWrongIndices([]);
    setIsCorrectSolved(false);
    resetBrainQuiz();
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-24 animate-fadeIn">
      {/* Quiz Header Card */}
      <div className="glass-card rounded-3xl p-5 border border-purple-500/40 text-center shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-extrabold text-cyan-400 tracking-tight flex items-center gap-1">
            <Zap className="w-4 h-4 text-amber-400" /> 뇌 자극 5단계 챌린지 (문항당 20점)
          </span>
          <span className="text-base font-black text-amber-300 bg-slate-900 px-3.5 py-1 rounded-full border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1 animate-bounce">
            <span>✨</span>
            <span>{brainQuiz.completed ? brainQuizScore : score}</span>
            <span className="text-xs text-slate-400 font-normal">/ 100p</span>
          </span>
        </div>
      </div>

      {!brainQuiz.completed ? (
        <div className="glass-card rounded-3xl p-6 border border-purple-500/20 text-center space-y-5 shadow-2xl">


          <div className="space-y-4 text-left">
            <h3 className="font-extrabold text-base sm:text-lg text-white leading-relaxed">
              <span className="text-cyan-300 font-black mr-2">{currentQ.title}</span>
              {currentQ.question}
            </h3>
            {currentQ.banner}

            <div className={`grid gap-3 pt-1 ${currentQ.options.length > 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {currentQ.options.map((opt, idx) => {
                const isWrongChoice = wrongIndices.includes(idx);
                let btnStyle = "w-full py-4 px-4 bg-slate-900/90 text-slate-100 font-bold text-sm sm:text-base rounded-xl border border-slate-700 hover:border-purple-500 hover:bg-purple-950/30 transition-all text-left flex items-center justify-between";

                if (isCorrectSolved) {
                  if (opt.isCorrect) {
                    btnStyle = "w-full py-4 px-4 bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 font-black text-sm sm:text-base rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] text-left flex items-center justify-between animate-pulse";
                  } else {
                    btnStyle = "w-full py-4 px-4 bg-slate-900/40 text-slate-500 font-bold text-sm sm:text-base rounded-xl border border-slate-800/50 opacity-40 text-left flex items-center justify-between cursor-not-allowed";
                  }
                } else if (isWrongChoice) {
                  btnStyle = "w-full py-4 px-4 bg-rose-950/80 border-2 border-rose-500 text-rose-300 font-bold text-sm sm:text-base rounded-xl text-left flex items-center justify-between opacity-70 cursor-not-allowed";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handlePickOption(idx, opt.isCorrect)}
                    disabled={isCorrectSolved || isWrongChoice}
                    className={`${btnStyle} ${opt.colorClass || ''}`}
                  >
                    <span>{opt.text}</span>
                    {isWrongChoice && <span className="text-xs sm:text-sm font-black text-rose-300">❌ 오답</span>}
                  </button>
                );
              })}
            </div>

            {/* Feedback Banner on Wrong Pick */}
            {!isCorrectSolved && wrongIndices.length > 0 && (
              <div className="p-3.5 bg-amber-950/80 border-2 border-amber-500/80 text-amber-200 text-center font-black text-sm rounded-xl animate-bounce shadow-lg flex items-center justify-center gap-2">
                <span>😅</span>
                <span>다시 한번 풀어 보세요!</span>
              </div>
            )}

            {/* Revealed Answer & Explanation Box */}
            {isCorrectSolved && (
              <div className="space-y-2.5 pt-2">
                {step !== 4 && (
                  <div className="p-3 rounded-xl border border-emerald-500/60 bg-emerald-950/90 text-emerald-300 text-center font-black text-sm flex items-center justify-center gap-2 shadow-lg">
                    <span>🎉 정답입니다! (+20점)</span>
                  </div>
                )}

                <div className="p-4 bg-purple-950/50 rounded-xl border border-purple-500/40 text-xs sm:text-sm text-slate-300 space-y-1.5 text-left shadow-lg">
                  <div className="font-extrabold text-cyan-300 flex items-center gap-1.5 text-sm sm:text-base">
                    <span>💡</span>
                    <span>정답: {currentQ.answerText}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    해설: {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Arrows */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-4">
            <button
              type="button"
              onClick={() => {
                playAudioEffect('click');
                setIsCorrectSolved(false);
                setWrongIndices([]);
                setStep((s) => Math.max(0, s - 1));
              }}
              disabled={step === 0}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1 transition-all ${
                step === 0
                  ? 'bg-slate-900/40 text-slate-600 border border-slate-800/50 cursor-not-allowed opacity-40'
                  : 'bg-slate-900 text-slate-200 border border-slate-700 hover:border-purple-500 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전</span>
            </button>

            <span className="text-xs sm:text-sm font-black text-purple-300 bg-slate-900 px-3 py-1 rounded-full border border-purple-500/30">
              {step + 1} / 5
            </span>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs sm:text-sm font-black rounded-xl border border-cyan-400/40 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>{step === 4 ? '완료' : '다음'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">🎉 퀴즈 5문항 완주 완료! (100점 획득)</h3>
            <p className="text-sm text-slate-300 mt-1">참여 완료로 <strong className="text-cyan-300">100점</strong>을 획득하셨습니다.</p>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
            {(() => {
              const levelStr = brainQuiz.level || '';
              const match = levelStr.match(/^(.*?)\s*(\(.*?\))$/);
              if (match) {
                return (
                  <div className="flex flex-col items-center justify-center text-center space-y-1">
                    <div className="text-xl sm:text-2xl font-black text-cyan-300">{match[1]}</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-300">{match[2]}</div>
                  </div>
                );
              }
              return <div className="text-lg sm:text-xl font-black text-cyan-300 text-center">{levelStr}</div>;
            })()}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRestart}
              className="flex-1 py-3.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-700 flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> 다시 도전하기
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:scale-105"
            >
              다음: 아이디어 존 작성 (100점) ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
