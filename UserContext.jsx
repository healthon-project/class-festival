import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const playAudioEffect = (type) => {
  // Mobile Haptic Vibration
  try {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      if (type === 'click') navigator.vibrate(20);
      else if (type === 'success') navigator.vibrate([40, 60, 40]);
      else if (type === 'fanfare') navigator.vibrate([100, 50, 100, 50, 200]);
      else if (type === 'wrong') navigator.vibrate([80, 40, 80]);
    }
  } catch (e) {}

  // Web Audio API Synth Sound
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + idx * 0.12);
        g.gain.setValueAtTime(0.3, now + idx * 0.12);
        g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.3);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + idx * 0.12);
        o.stop(now + idx * 0.12 + 0.3);
      });
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    console.warn('Audio effect failed', e);
  }
};

export const getLocalDateString = (d = new Date()) => {
  const targetDate = new Date(d);
  if (typeof window !== 'undefined' && window.virtualDateOffset) {
    targetDate.setDate(targetDate.getDate() + window.virtualDateOffset);
  }
  const yr = targetDate.getFullYear();
  const mo = String(targetDate.getMonth() + 1).padStart(2, '0');
  const dy = String(targetDate.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${dy}`;
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('class_festival_profile');
    return saved ? JSON.parse(saved) : { affiliation: '', name: '', avatar: '👨‍🏫' };
  });

  const [bodyMissions, setBodyMissions] = useState(() => {
    const saved = localStorage.getItem('class_festival_body');
    return saved ? JSON.parse(saved) : {
      walk20s: false,
      squats30: false,
      balance10s: false,
      water1cup: false,
      highfive: false,
    };
  });

  const [eyeQuiz, setEyeQuiz] = useState(() => {
    const saved = localStorage.getItem('class_festival_eye');
    return saved ? JSON.parse(saved) : {
      completed: false,
      score: 0,
      level: 'B',
      correctAnswers: 0,
    };
  });

  const [review, setReview] = useState(() => {
    const saved = localStorage.getItem('class_festival_review');
    return saved ? JSON.parse(saved) : {
      completed: false,
      toolIdea: '',
      classroomPain: '',
      pledgeKeyword: '',
      idea: '',
      boothReview: '',
      rating: 5,
    };
  });

  // Unique user storage key builder
  const getUserStickerKey = (prof = profile) => {
    const nameStr = (prof.name || 'default').replace(/\s+/g, '_');
    const affStr = (prof.affiliation || 'general').replace(/\s+/g, '_');
    return `expedition_logs_${affStr}_${nameStr}`;
  };

  // Overnight reset check: if user wakes up on a new day, reset today's daily missions while preserving cumulative stickers
  const checkDailyReset = () => {
    const today = getLocalDateString();
    const lastActiveDate = localStorage.getItem('class_festival_last_active_date');
    if (lastActiveDate && lastActiveDate !== today) {
      setBodyMissions({ walk20s: false, squats30: false, balance10s: false, water1cup: false, highfive: false });
      setEyeQuiz({ completed: false, score: 0, level: 'B', correctAnswers: 0 });
      setReview({ completed: false, toolIdea: '', classroomPain: '', pledgeKeyword: '', idea: '', boothReview: '', rating: 5 });
    }
    localStorage.setItem('class_festival_last_active_date', today);
  };

  useEffect(() => {
    checkDailyReset();
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    const savedProfile = localStorage.getItem('class_festival_profile');
    return savedProfile ? 'mission' : 'login';
  });

  const [isAdminView, setIsAdminView] = useState(false);

  const [allReviews, setAllReviews] = useState(() => {
    const savedFeed = localStorage.getItem('class_festival_all_reviews');
    return savedFeed ? JSON.parse(savedFeed) : [
      {
        id: 1,
        name: '김민수 선생님',
        affiliation: '서울초등학교',
        toolIdea: '수학 퀴즈 생성을 AI 프롬프트로 3초 만에 만들기!',
        classroomPain: '단원별 수준별 형성평가 문제 제작 시간이 늘 부족함',
        pledgeKeyword: '매주 1회 학생들과 AI 프롬프트 수업 도전! #수업혁신',
        idea: '수학 퀴즈 생성을 AI 프롬프트로 3초 만에 만들기!',
        review: '매주 1회 학생들과 AI 프롬프트 수업 도전! #수업혁신',
        date: '방금 전',
        score: 300,
        level: 'A'
      },
    ];
  });

  const bodyScore = Object.values(bodyMissions).filter(Boolean).length * 20;
  const eyeQuizScore = eyeQuiz.completed ? 100 : 0;
  const reviewScore = review.completed ? 100 : 0;
  const totalScore = bodyScore + eyeQuizScore + reviewScore;
  const isStickerActive = totalScore >= 300;

  // Unbreakable multi-layer sticker log storage
  const [expeditionLogs, setExpeditionLogs] = useState(() => {
    const uKey = getUserStickerKey(profile);
    const userSaved = localStorage.getItem(uKey);
    const saved = localStorage.getItem('expedition_logs');
    const backup = localStorage.getItem('expedition_logs_backup');
    const target = userSaved || saved || backup;
    if (target) {
      try {
        const parsed = JSON.parse(target);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [
      { date: '2026-08-25', points: 100 },
      { date: '2026-08-26', points: 100 },
      { date: '2026-08-27', points: 100 },
      { date: '2026-08-28', points: 100 },
    ];
  });

  // Save to primary, user-bound key, and backup keys simultaneously
  const saveExpeditionLogsSafe = (logs) => {
    if (!logs || !Array.isArray(logs)) return;
    const dataStr = JSON.stringify(logs);
    const uKey = getUserStickerKey(profile);
    localStorage.setItem(uKey, dataStr);
    localStorage.setItem('expedition_logs', dataStr);
    localStorage.setItem('expedition_logs_backup', dataStr);
  };

  useEffect(() => {
    if (totalScore >= 300) {
      const today = getLocalDateString();
      setExpeditionLogs(prev => {
        const exists = prev.some(log => log.date === today);
        if (exists) return prev;
        const next = [...prev, { date: today, points: 100 }];
        saveExpeditionLogsSafe(next);
        return next;
      });
    }
  }, [totalScore]);

  useEffect(() => {
    if (expeditionLogs && expeditionLogs.length > 0) {
      saveExpeditionLogsSafe(expeditionLogs);
    }
  }, [expeditionLogs, profile]);

  const totalExpeditionPoints = expeditionLogs.reduce((sum, log) => sum + (log.points || 100), 0);
  const activeStickerCount = expeditionLogs.length;
  const POINTS_PER_LEVEL = 500;
  const currentExpeditionLevel = Math.floor(totalExpeditionPoints / POINTS_PER_LEVEL) + 1;
  const levelProgressPercent = Math.min(100, ((totalExpeditionPoints % POINTS_PER_LEVEL) / POINTS_PER_LEVEL) * 100);
  const pointsToNextLevel = POINTS_PER_LEVEL - (totalExpeditionPoints % POINTS_PER_LEVEL);
  const streakDays = expeditionLogs.length;

  const getLevelTitle = (lvl) => {
    if (lvl === 1) return '🐣 새싹 탐험가';
    if (lvl === 2) return '🏃‍♂️ 열정 탐험가';
    if (lvl === 3) return '⚔️ 베테랑 탐험가';
    if (lvl === 4) return '👑 마스터 탐험가';
    return '🌌 전설의 탐험대장';
  };

  const levelTitle = getLevelTitle(currentExpeditionLevel);

  const doDailyCheckIn = () => {
    const today = getLocalDateString();
    const alreadyDone = expeditionLogs.some(log => log.date === today);
    if (alreadyDone) {
      playAudioEffect('wrong');
      return { success: false, message: '오늘 탐험 스티커는 이미 획득했어요! 내일 또 도전하세요! 🔥' };
    }
    const newLogs = [...expeditionLogs, { date: today, points: 100 }];
    setExpeditionLogs(newLogs);
    saveExpeditionLogsSafe(newLogs);
    playAudioEffect('fanfare');
    return { success: true, message: '🎉 오늘 탐험 스티커가 60일 탐험판에 쾅 적립되었습니다!' };
  };

  // Immediate simulation test helper: simulates waking up tomorrow
  const simulateNextDay = () => {
    if (typeof window !== 'undefined') {
      window.virtualDateOffset = (window.virtualDateOffset || 0) + 1;
    }
    setBodyMissions({ walk20s: false, squats30: false, balance10s: false, water1cup: false, highfive: false });
    setEyeQuiz({ completed: false, score: 0, level: 'B', correctAnswers: 0 });
    setReview({ completed: false, toolIdea: '', classroomPain: '', pledgeKeyword: '', idea: '', boothReview: '', rating: 5 });
    playAudioEffect('fanfare');
    const newToday = getLocalDateString();
    return { success: true, message: `🌙 자고 일어났습니다! (시뮬레이션 날짜: ${newToday})\n- 오늘의 미션: 새로운 도전으로 리셋\n- 스티커판: 이전 스티커 ${activeStickerCount}개 안전하게 100% 누적 보존!` };
  };

  useEffect(() => {
    localStorage.setItem('class_festival_body', JSON.stringify(bodyMissions));
  }, [bodyMissions]);

  useEffect(() => {
    localStorage.setItem('class_festival_eye', JSON.stringify(eyeQuiz));
  }, [eyeQuiz]);

  useEffect(() => {
    localStorage.setItem('class_festival_review', JSON.stringify(review));
  }, [review]);

  useEffect(() => {
    localStorage.setItem('class_festival_all_reviews', JSON.stringify(allReviews));
  }, [allReviews]);

  const loginUser = (affiliation, name, avatar) => {
    setProfile({ affiliation, name, avatar });
    playAudioEffect('success');
    setActiveTab('mission');
  };

  const logoutUser = () => {
    setProfile({ affiliation: '', name: '', avatar: '👨‍🏫' });
    setBodyMissions({ walk20s: false, squats30: false, balance10s: false, water1cup: false, highfive: false });
    setEyeQuiz({ completed: false, score: 0, level: 'B', correctAnswers: 0 });
    setReview({ completed: false, toolIdea: '', classroomPain: '', pledgeKeyword: '', idea: '', boothReview: '', rating: 5 });
    localStorage.removeItem('class_festival_profile');
    localStorage.removeItem('class_festival_body');
    localStorage.removeItem('class_festival_eye');
    localStorage.removeItem('class_festival_review');
    playAudioEffect('click');
  };

  const toggleBodyMission = (missionKey) => {
    setBodyMissions(prev => {
      const nextState = { ...prev, [missionKey]: !prev[missionKey] };
      if (!prev[missionKey]) playAudioEffect('success');
      return nextState;
    });
  };

  const completeEyeQuiz = (scorePoints, levelGrade, correctCount) => {
    setEyeQuiz({
      completed: true,
      score: scorePoints,
      level: levelGrade,
      correctAnswers: correctCount,
    });
    playAudioEffect('success');
  };

  const submitReviewData = (toolIdeaText, classroomPainText, pledgeKeywordText, starRating = 5) => {
    setReview({
      completed: true,
      toolIdea: toolIdeaText,
      classroomPain: classroomPainText,
      pledgeKeyword: pledgeKeywordText,
      idea: toolIdeaText,
      boothReview: pledgeKeywordText,
      rating: starRating,
    });

    const newFeedItem = {
      id: Date.now(),
      name: profile.name || '선생님',
      affiliation: profile.affiliation || '페스티벌 참여자',
      toolIdea: toolIdeaText,
      classroomPain: classroomPainText,
      pledgeKeyword: pledgeKeywordText,
      idea: toolIdeaText,
      review: pledgeKeywordText,
      date: '방금 전',
      score: totalScore + 100,
      level: eyeQuiz.level || 'A',
    };

    setAllReviews(prev => [newFeedItem, ...prev]);
    playAudioEffect('fanfare');
  };

  const resetReview = () => {
    setReview({ completed: false, toolIdea: '', classroomPain: '', pledgeKeyword: '', idea: '', boothReview: '', rating: 5 });
    playAudioEffect('click');
  };

  const resetProgress = () => {
    localStorage.removeItem('class_festival_profile');
    localStorage.removeItem('class_festival_body');
    localStorage.removeItem('class_festival_eye');
    localStorage.removeItem('class_festival_review');
    setProfile({ affiliation: '', name: '', avatar: '👨‍🏫' });
    setBodyMissions({ walk20s: false, squats30: false, balance10s: false, water1cup: false, highfive: false });
    setEyeQuiz({ completed: false, score: 0, level: 'B', correctAnswers: 0 });
    setReview({ completed: false, toolIdea: '', classroomPain: '', pledgeKeyword: '', idea: '', boothReview: '', rating: 5 });
    setActiveTab('login');
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        loginUser,
        logoutUser,
        bodyMissions,
        toggleBodyMission,
        bodyScore,
        eyeQuiz,
        completeEyeQuiz,
        eyeQuizScore,
        review,
        submitReviewData,
        resetReview,
        reviewScore,
        totalScore,
        isStickerActive,
        expeditionLogs,
        totalExpeditionPoints,
        activeStickerCount,
        currentExpeditionLevel,
        levelProgressPercent,
        pointsToNextLevel,
        streakDays,
        levelTitle,
        doDailyCheckIn,
        simulateNextDay,
        activeTab,
        setActiveTab,
        isAdminView,
        setIsAdminView,
        allReviews,
        resetProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
