import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavTab,
  Language,
  UserProfile,
  CourseModule,
  ZoomClass,
  PrayerItem,
  QuranProgress,
  FinanceData,
  QuoteItem,
  CalendarEvent,
  RoutineTask,
  ExerciseRoutineItem,
  ChildProfile,
  ChildSubject,
  ReviewSession,
  SleepRoutineData,
  NotificationItem,
  ChatMessage,
  IncomeRecord,
  EnglishWord,
  EnglishGrammarLesson,
  EnglishSpeakingTopic,
  EnglishListeningExercise,
  EnglishReadingArticle,
  EnglishMotivationalQuote,
  EnglishLearningState,
} from '../types';
import {
  initialProfile,
  initialCourseModules,
  initialZoomClasses,
  initialPrayers,
  initialQuranProgress,
  initialFinanceData,
  initialQuotes,
  initialRoutineTasks,
  initialMorningExercises,
  initialEveningExercises,
  initialChildren,
  initialSleepRoutine,
  initialCalendarEvents,
  initialNotifications,
} from '../data/initialData';
import {
  initialEnglishWords,
  initialEnglishGrammarLessons,
  initialEnglishSpeakingTopics,
  initialEnglishListeningExercises,
  initialEnglishReadingArticles,
  initialEnglishMotivationalQuotes,
  initialEnglishLearningState,
} from '../data/initialEnglishData';
import { playGentleChime, playCelebrationFanfare } from '../utils/audio';

interface DashboardContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Profile
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Course Modules
  modules: CourseModule[];
  toggleModuleComplete: (id: string) => void;
  updateModule: (id: string, updated: Partial<CourseModule>) => void;

  // Zoom
  zoomClasses: ZoomClass[];
  updateZoomClass: (id: string, updated: Partial<ZoomClass>) => void;
  toggleZoomAttended: (id: string) => void;

  // Prayer & Quran
  prayers: PrayerItem[];
  togglePrayer: (id: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => void;
  updatePrayerTime: (id: string, newTime: string) => void;
  quranProgress: QuranProgress;
  updateQuranProgress: (updated: Partial<QuranProgress>) => void;
  markQuranReadToday: () => void;

  // Finance
  financeData: FinanceData;
  addIncomeRecord: (record: Omit<IncomeRecord, 'id'>) => void;
  deleteIncomeRecord: (id: string) => void;
  updateMonthlyTarget: (target: number) => void;
  toggleFinanceAlarm: () => void;
  showMilestoneCelebration: boolean;
  closeMilestoneCelebration: () => void;

  // Motivation & Quotes
  quotes: QuoteItem[];
  toggleFavoriteQuote: (id: string) => void;
  addCustomAffirmation: (affirmation: { english: string; arabic?: string; somali?: string; category: QuoteItem['category'] }) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteCalendarEvent: (id: string) => void;
  updateCalendarEvent: (id: string, updated: Partial<CalendarEvent>) => void;

  // Routines
  routineTasks: RoutineTask[];
  toggleRoutineTask: (id: string) => void;
  addRoutineTask: (task: Omit<RoutineTask, 'id'>) => void;
  deleteRoutineTask: (id: string) => void;

  // Health / Exercise
  morningExercises: ExerciseRoutineItem[];
  eveningExercises: ExerciseRoutineItem[];
  toggleExercise: (routine: 'morning' | 'evening', id: string) => void;

  // Children's Study
  children: ChildProfile[];
  updateChild: (id: string, updated: Partial<ChildProfile>) => void;
  addChild: (child: Omit<ChildProfile, 'id'>) => void;
  deleteChild: (id: string) => void;
  toggleSubjectReviewed: (childId: string, subjectId: string) => void;
  addSubjectToChild: (childId: string, subject: Omit<ChildSubject, 'id'>) => void;
  deleteSubjectFromChild: (childId: string, subjectId: string) => void;
  updateChildSubject: (childId: string, subjectId: string, updated: Partial<ChildSubject>) => void;
  addReviewSession: (childId: string, session: Omit<ReviewSession, 'id'>) => void;
  toggleReviewSession: (childId: string, sessionId: string) => void;
  deleteReviewSession: (childId: string, sessionId: string) => void;
  toggleStudyReminder: (childId: string) => void;
  updateStudyReminder: (childId: string, time: string, enabled?: boolean) => void;

  // English Learning
  englishWords: EnglishWord[];
  grammarLessons: EnglishGrammarLesson[];
  speakingTopics: EnglishSpeakingTopic[];
  listeningExercises: EnglishListeningExercise[];
  readingArticles: EnglishReadingArticle[];
  motivationalQuotes: EnglishMotivationalQuote[];
  englishState: EnglishLearningState;
  updateEnglishState: (updates: Partial<EnglishLearningState>) => void;
  toggleWordLearned: (id: string) => void;
  addCustomWord: (word: Omit<EnglishWord, 'id' | 'learned' | 'isCustom'>) => void;
  toggleGrammarMastered: (id: string) => void;
  toggleSpeakingCompleted: (id: string) => void;
  toggleListeningCompleted: (id: string) => void;
  toggleReadingCompleted: (id: string) => void;
  toggleDailyChecklistItem: (key: keyof EnglishLearningState['dailyChecklist']) => void;
  setEnglishStudyTime: (time: string, durationMinutes: number, syncToRoutine?: boolean) => void;
  recordEnglishStudyMinutes: (minutes: number) => void;

  // Sleep
  sleepRoutine: SleepRoutineData;
  updateSleepRoutine: (updated: Partial<SleepRoutineData>) => void;
  toggleSleepChecklistItem: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (title: string, message: string, type: NotificationItem['type']) => void;

  // AI Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;

  // Data Export & Reset
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'muna_growth_dashboard_v1';

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<Language>('en');

  // Load persisted state or initial
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [modules, setModules] = useState<CourseModule[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_modules`);
      return saved ? JSON.parse(saved) : initialCourseModules;
    } catch {
      return initialCourseModules;
    }
  });

  const [zoomClasses, setZoomClasses] = useState<ZoomClass[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_zoom`);
      return saved ? JSON.parse(saved) : initialZoomClasses;
    } catch {
      return initialZoomClasses;
    }
  });

  const [prayers, setPrayers] = useState<PrayerItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_prayers`);
      return saved ? JSON.parse(saved) : initialPrayers;
    } catch {
      return initialPrayers;
    }
  });

  const [quranProgress, setQuranProgress] = useState<QuranProgress>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_quran`);
      return saved ? JSON.parse(saved) : initialQuranProgress;
    } catch {
      return initialQuranProgress;
    }
  });

  const [financeData, setFinanceData] = useState<FinanceData>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_finance`);
      return saved ? JSON.parse(saved) : initialFinanceData;
    } catch {
      return initialFinanceData;
    }
  });

  const [showMilestoneCelebration, setShowMilestoneCelebration] = useState(false);

  const [quotes, setQuotes] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_quotes`);
      return saved ? JSON.parse(saved) : initialQuotes;
    } catch {
      return initialQuotes;
    }
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_calendar`);
      return saved ? JSON.parse(saved) : initialCalendarEvents;
    } catch {
      return initialCalendarEvents;
    }
  });

  const [routineTasks, setRoutineTasks] = useState<RoutineTask[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_routines`);
      return saved ? JSON.parse(saved) : initialRoutineTasks;
    } catch {
      return initialRoutineTasks;
    }
  });

  const [morningExercises, setMorningExercises] = useState<ExerciseRoutineItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_morning_ex`);
      return saved ? JSON.parse(saved) : initialMorningExercises;
    } catch {
      return initialMorningExercises;
    }
  });

  const [eveningExercises, setEveningExercises] = useState<ExerciseRoutineItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_evening_ex`);
      return saved ? JSON.parse(saved) : initialEveningExercises;
    } catch {
      return initialEveningExercises;
    }
  });

  const [childrenData, setChildrenData] = useState<ChildProfile[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_children`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((c: any) => c.name === 'Cabdiraxman')) {
          return parsed;
        }
      }
      return initialChildren;
    } catch {
      return initialChildren;
    }
  });

  const [sleepRoutine, setSleepRoutine] = useState<SleepRoutineData>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_sleep`);
      return saved ? JSON.parse(saved) : initialSleepRoutine;
    } catch {
      return initialSleepRoutine;
    }
  });

  const [englishWords, setEnglishWords] = useState<EnglishWord[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_eng_words`);
      return saved ? JSON.parse(saved) : initialEnglishWords;
    } catch {
      return initialEnglishWords;
    }
  });

  const [grammarLessons] = useState<EnglishGrammarLesson[]>(initialEnglishGrammarLessons);
  const [speakingTopics] = useState<EnglishSpeakingTopic[]>(initialEnglishSpeakingTopics);
  const [listeningExercises] = useState<EnglishListeningExercise[]>(initialEnglishListeningExercises);
  const [readingArticles] = useState<EnglishReadingArticle[]>(initialEnglishReadingArticles);
  const [motivationalQuotes] = useState<EnglishMotivationalQuote[]>(initialEnglishMotivationalQuotes);

  const [englishState, setEnglishState] = useState<EnglishLearningState>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_eng_state`);
      return saved ? JSON.parse(saved) : initialEnglishLearningState;
    } catch {
      return initialEnglishLearningState;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifs`);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_chat`);
      return saved ? JSON.parse(saved) : [
        {
          id: 'msg-init',
          role: 'assistant',
          content: `Assalamu Alaikum Muna! I am **Muna AI Coach**, your personal Somali Wealth Academy study advisor, digital marketing mentor, and productivity accountability partner.\n\nHow can I help you move closer to your goals today? You can ask me to help structure your study block, plan high-converting content for Canva or Stan Store, create affiliate marketing ideas, or organize your daily schedule as a mother.`,
          timestamp: 'Just now',
        },
      ];
    } catch {
      return [];
    }
  });

  // Sync theme with HTML class
  useEffect(() => {
    const savedTheme = localStorage.getItem(`${LOCAL_STORAGE_KEY}_theme`) as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_theme`, next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_modules`, JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_zoom`, JSON.stringify(zoomClasses));
  }, [zoomClasses]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_prayers`, JSON.stringify(prayers));
  }, [prayers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_quran`, JSON.stringify(quranProgress));
  }, [quranProgress]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_finance`, JSON.stringify(financeData));
  }, [financeData]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_quotes`, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_calendar`, JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_routines`, JSON.stringify(routineTasks));
  }, [routineTasks]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_morning_ex`, JSON.stringify(morningExercises));
  }, [morningExercises]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_evening_ex`, JSON.stringify(eveningExercises));
  }, [eveningExercises]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_children`, JSON.stringify(childrenData));
  }, [childrenData]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_sleep`, JSON.stringify(sleepRoutine));
  }, [sleepRoutine]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_eng_words`, JSON.stringify(englishWords));
  }, [englishWords]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_eng_state`, JSON.stringify(englishState));
  }, [englishState]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifs`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_chat`, JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Actions
  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const toggleModuleComplete = (id: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.completed;
          if (next) playGentleChime();
          return { ...m, completed: next };
        }
        return m;
      })
    );
  };

  const updateModule = (id: string, updated: Partial<CourseModule>) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  };

  const updateZoomClass = (id: string, updated: Partial<ZoomClass>) => {
    setZoomClasses((prev) => prev.map((z) => (z.id === id ? { ...z, ...updated } : z)));
  };

  const toggleZoomAttended = (id: string) => {
    setZoomClasses((prev) =>
      prev.map((z) => {
        if (z.id === id) {
          const next = !z.attended;
          if (next) playGentleChime();
          return { ...z, attended: next };
        }
        return z;
      })
    );
  };

  const togglePrayer = (id: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = !p.completed;
          if (next) playGentleChime();
          return { ...p, completed: next };
        }
        return p;
      })
    );
  };

  const updatePrayerTime = (id: string, newTime: string) => {
    setPrayers((prev) => prev.map((p) => (p.id === id ? { ...p, time: newTime } : p)));
  };

  const updateQuranProgress = (updated: Partial<QuranProgress>) => {
    setQuranProgress((prev) => ({ ...prev, ...updated }));
  };

  const markQuranReadToday = () => {
    playGentleChime();
    setQuranProgress((prev) => ({
      ...prev,
      completedToday: true,
      streakDays: prev.completedToday ? prev.streakDays : prev.streakDays + 1,
    }));
  };

  const addIncomeRecord = (record: Omit<IncomeRecord, 'id'>) => {
    const newRecord: IncomeRecord = {
      ...record,
      id: `rec-${Date.now()}`,
    };

    setFinanceData((prev) => {
      const updatedRecords = [newRecord, ...prev.records];
      const currentTotal = updatedRecords.reduce((sum, r) => sum + r.amount, 0);

      // Check if monthly target is met or exceeded
      const currentMonthKey = new Date().toISOString().slice(0, 7);
      const isNewCelebration = currentTotal >= prev.monthlyTarget && prev.milestoneReachedAlertShownForMonth !== currentMonthKey;

      if (isNewCelebration) {
        setShowMilestoneCelebration(true);
        if (prev.alarmSoundEnabled) {
          playCelebrationFanfare();
        }
      } else {
        playGentleChime();
      }

      return {
        ...prev,
        records: updatedRecords,
        milestoneReachedAlertShownForMonth: currentTotal >= prev.monthlyTarget ? currentMonthKey : prev.milestoneReachedAlertShownForMonth,
      };
    });

    addNotification(
      'Income Recorded',
      `+$${record.amount} from ${record.source} added to your monthly income!`,
      'finance'
    );
  };

  const deleteIncomeRecord = (id: string) => {
    setFinanceData((prev) => ({
      ...prev,
      records: prev.records.filter((r) => r.id !== id),
    }));
  };

  const updateMonthlyTarget = (target: number) => {
    setFinanceData((prev) => ({ ...prev, monthlyTarget: target }));
  };

  const toggleFinanceAlarm = () => {
    setFinanceData((prev) => ({ ...prev, alarmSoundEnabled: !prev.alarmSoundEnabled }));
  };

  const closeMilestoneCelebration = () => {
    setShowMilestoneCelebration(false);
  };

  const toggleFavoriteQuote = (id: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, isFavorite: !q.isFavorite } : q)));
  };

  const addCustomAffirmation = (affirmation: { english: string; arabic?: string; somali?: string; category: QuoteItem['category'] }) => {
    playGentleChime();
    const newQuote: QuoteItem = {
      id: `quote-${Date.now()}`,
      english: affirmation.english,
      arabic: affirmation.arabic,
      somali: affirmation.somali,
      category: affirmation.category,
      isFavorite: true,
      isCustom: true,
    };
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    playGentleChime();
    const newEv: CalendarEvent = { ...event, id: `ev-${Date.now()}` };
    setCalendarEvents((prev) => [...prev, newEv]);
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updateCalendarEvent = (id: string, updated: Partial<CalendarEvent>) => {
    setCalendarEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const toggleRoutineTask = (id: string) => {
    setRoutineTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          if (next) playGentleChime();
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const addRoutineTask = (task: Omit<RoutineTask, 'id'>) => {
    playGentleChime();
    const newTask: RoutineTask = { ...task, id: `rt-${Date.now()}` };
    setRoutineTasks((prev) => [...prev, newTask]);
  };

  const deleteRoutineTask = (id: string) => {
    setRoutineTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleExercise = (routine: 'morning' | 'evening', id: string) => {
    if (routine === 'morning') {
      setMorningExercises((prev) =>
        prev.map((ex) => {
          if (ex.id === id) {
            const next = !ex.completed;
            if (next) playGentleChime();
            return { ...ex, completed: next };
          }
          return ex;
        })
      );
    } else {
      setEveningExercises((prev) =>
        prev.map((ex) => {
          if (ex.id === id) {
            const next = !ex.completed;
            if (next) playGentleChime();
            return { ...ex, completed: next };
          }
          return ex;
        })
      );
    }
  };

  const updateChild = (id: string, updated: Partial<ChildProfile>) => {
    setChildrenData((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const addChild = (child: Omit<ChildProfile, 'id'>) => {
    playGentleChime();
    const newChild: ChildProfile = {
      ...child,
      id: `c-${Date.now()}`,
      reviewSessions: child.reviewSessions || [],
    };
    setChildrenData((prev) => [...prev, newChild]);
  };

  const deleteChild = (id: string) => {
    playGentleChime();
    setChildrenData((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleSubjectReviewed = (childId: string, subjectId: string) => {
    playGentleChime();
    setChildrenData((prev) =>
      prev.map((c) => {
        if (c.id === childId) {
          return {
            ...c,
            subjects: c.subjects.map((s) => (s.id === subjectId ? { ...s, reviewedToday: !s.reviewedToday } : s)),
          };
        }
        return c;
      })
    );
  };

  const addSubjectToChild = (childId: string, subject: Omit<ChildSubject, 'id'>) => {
    playGentleChime();
    const newSub: ChildSubject = { ...subject, id: `sub-${Date.now()}` };
    setChildrenData((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, subjects: [...c.subjects, newSub] } : c))
    );
  };

  const deleteSubjectFromChild = (childId: string, subjectId: string) => {
    playGentleChime();
    setChildrenData((prev) =>
      prev.map((c) =>
        c.id === childId ? { ...c, subjects: c.subjects.filter((s) => s.id !== subjectId) } : c
      )
    );
  };

  const updateChildSubject = (childId: string, subjectId: string, updated: Partial<ChildSubject>) => {
    setChildrenData((prev) =>
      prev.map((c) =>
        c.id === childId
          ? {
              ...c,
              subjects: c.subjects.map((s) => (s.id === subjectId ? { ...s, ...updated } : s)),
            }
          : c
      )
    );
  };

  const addReviewSession = (childId: string, session: Omit<ReviewSession, 'id'>) => {
    playGentleChime();
    const newSession: ReviewSession = { ...session, id: `rev-${Date.now()}` };
    setChildrenData((prev) =>
      prev.map((c) =>
        c.id === childId
          ? { ...c, reviewSessions: [...(c.reviewSessions || []), newSession] }
          : c
      )
    );
  };

  const toggleReviewSession = (childId: string, sessionId: string) => {
    playGentleChime();
    setChildrenData((prev) =>
      prev.map((c) => {
        if (c.id === childId) {
          const sessions = (c.reviewSessions || []).map((s) =>
            s.id === sessionId ? { ...s, completed: !s.completed } : s
          );
          return { ...c, reviewSessions: sessions };
        }
        return c;
      })
    );
  };

  const deleteReviewSession = (childId: string, sessionId: string) => {
    setChildrenData((prev) =>
      prev.map((c) =>
        c.id === childId
          ? { ...c, reviewSessions: (c.reviewSessions || []).filter((s) => s.id !== sessionId) }
          : c
      )
    );
  };

  const toggleStudyReminder = (childId: string) => {
    playGentleChime();
    setChildrenData((prev) =>
      prev.map((c) => {
        if (c.id === childId) {
          const next = !c.studyReminderEnabled;
          if (next) {
            addNotification(
              `Study Reminder Active: ${c.name}`,
              `Daily homework review reminder set for ${c.name} at ${c.studyReminderTime || '16:30'}.`,
              'study'
            );
          }
          return { ...c, studyReminderEnabled: next };
        }
        return c;
      })
    );
  };

  const updateStudyReminder = (childId: string, time: string, enabled?: boolean) => {
    setChildrenData((prev) =>
      prev.map((c) =>
        c.id === childId
          ? {
              ...c,
              studyReminderTime: time,
              studyReminderEnabled: enabled !== undefined ? enabled : c.studyReminderEnabled,
            }
          : c
      )
    );
  };

  const updateSleepRoutine = (updated: Partial<SleepRoutineData>) => {
    setSleepRoutine((prev) => ({ ...prev, ...updated }));
  };

  const toggleSleepChecklistItem = (id: string) => {
    playGentleChime();
    setSleepRoutine((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    }));
  };

  // English Learning Actions
  const updateEnglishState = (updates: Partial<EnglishLearningState>) => {
    setEnglishState((prev) => ({ ...prev, ...updates }));
  };

  const toggleWordLearned = (id: string) => {
    playGentleChime();
    setEnglishWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, learned: !w.learned } : w))
    );
    setEnglishState((prev) => {
      const isCurrentlyLearned = prev.wordsLearned.includes(id);
      const nextWords = isCurrentlyLearned
        ? prev.wordsLearned.filter((wId) => wId !== id)
        : [...prev.wordsLearned, id];
      return {
        ...prev,
        wordsLearned: nextWords,
        dailyChecklist: {
          ...prev.dailyChecklist,
          vocabulary: nextWords.length > 0,
        },
      };
    });
  };

  const addCustomWord = (word: Omit<EnglishWord, 'id' | 'learned' | 'isCustom'>) => {
    playGentleChime();
    const newWord: EnglishWord = {
      ...word,
      id: `custom-w-${Date.now()}`,
      learned: false,
      isCustom: true,
    };
    setEnglishWords((prev) => [newWord, ...prev]);
    addNotification('New Vocabulary Added', `Added "${word.word}" to your English vocabulary list.`, 'study');
  };

  const toggleGrammarMastered = (id: string) => {
    playCelebrationFanfare();
    setEnglishState((prev) => {
      const hasMastered = prev.grammarMastered.includes(id);
      const nextMastered = hasMastered
        ? prev.grammarMastered.filter((mId) => mId !== id)
        : [...prev.grammarMastered, id];
      return {
        ...prev,
        grammarMastered: nextMastered,
        dailyChecklist: {
          ...prev.dailyChecklist,
          grammar: true,
        },
      };
    });
  };

  const toggleSpeakingCompleted = (id: string) => {
    playCelebrationFanfare();
    setEnglishState((prev) => {
      const hasCompleted = prev.speakingCompleted.includes(id);
      const next = hasCompleted
        ? prev.speakingCompleted.filter((sId) => sId !== id)
        : [...prev.speakingCompleted, id];
      return {
        ...prev,
        speakingCompleted: next,
        dailyChecklist: {
          ...prev.dailyChecklist,
          speaking: true,
        },
      };
    });
  };

  const toggleListeningCompleted = (id: string) => {
    playCelebrationFanfare();
    setEnglishState((prev) => {
      const hasCompleted = prev.listeningCompleted.includes(id);
      const next = hasCompleted
        ? prev.listeningCompleted.filter((lId) => lId !== id)
        : [...prev.listeningCompleted, id];
      return {
        ...prev,
        listeningCompleted: next,
        dailyChecklist: {
          ...prev.dailyChecklist,
          listening: true,
        },
      };
    });
  };

  const toggleReadingCompleted = (id: string) => {
    playCelebrationFanfare();
    setEnglishState((prev) => {
      const hasCompleted = prev.readingCompleted.includes(id);
      const next = hasCompleted
        ? prev.readingCompleted.filter((rId) => rId !== id)
        : [...prev.readingCompleted, id];
      return {
        ...prev,
        readingCompleted: next,
        dailyChecklist: {
          ...prev.dailyChecklist,
          reading: true,
        },
      };
    });
  };

  const toggleDailyChecklistItem = (key: keyof EnglishLearningState['dailyChecklist']) => {
    playGentleChime();
    setEnglishState((prev) => ({
      ...prev,
      dailyChecklist: {
        ...prev.dailyChecklist,
        [key]: !prev.dailyChecklist[key],
      },
    }));
  };

  const format24To12 = (time24: string) => {
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr || '14', 10);
    const m = mStr || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h < 10 ? '0' + h : h}:${m} ${ampm}`;
  };

  const setEnglishStudyTime = (time: string, durationMinutes: number, syncToRoutine: boolean = true) => {
    playGentleChime();
    setEnglishState((prev) => ({
      ...prev,
      studyTime: time,
      reminderTime: time,
      studyDurationMinutes: durationMinutes,
    }));

    if (syncToRoutine) {
      const time12 = format24To12(time);
      setRoutineTasks((prev) => {
        const existingIdx = prev.findIndex(
          (t) => t.category === 'English Study' || t.title.toLowerCase().includes('english')
        );
        if (existingIdx !== -1) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            time: time12,
            durationMinutes,
            title: 'Daily English Study Session: Vocabulary, Speaking & Grammar',
            category: 'English Study',
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: `rt-eng-${Date.now()}`,
              time: time12,
              title: 'Daily English Study Session: Vocabulary, Speaking & Grammar',
              category: 'English Study',
              completed: false,
              durationMinutes,
              reminderEnabled: true,
            },
          ];
        }
      });
      addNotification(
        'English Study Scheduled',
        `Your daily English study session has been scheduled at ${time12} (${durationMinutes} mins) in your Personal Routine!`,
        'study'
      );
    }
  };

  const recordEnglishStudyMinutes = (minutes: number) => {
    setEnglishState((prev) => ({
      ...prev,
      totalMinutesLearned: prev.totalMinutesLearned + minutes,
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const exportDataJSON = () => {
    const fullBackup = {
      profile,
      modules,
      zoomClasses,
      prayers,
      quranProgress,
      financeData,
      quotes,
      calendarEvents,
      routineTasks,
      morningExercises,
      eveningExercises,
      childrenData,
      sleepRoutine,
      englishWords,
      englishState,
      exportedAt: new Date().toISOString(),
      owner: 'Muna Mohamed',
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Muna_Growth_Journey_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profile) setProfile(data.profile);
      if (data.modules) setModules(data.modules);
      if (data.zoomClasses) setZoomClasses(data.zoomClasses);
      if (data.prayers) setPrayers(data.prayers);
      if (data.quranProgress) setQuranProgress(data.quranProgress);
      if (data.financeData) setFinanceData(data.financeData);
      if (data.quotes) setQuotes(data.quotes);
      if (data.calendarEvents) setCalendarEvents(data.calendarEvents);
      if (data.routineTasks) setRoutineTasks(data.routineTasks);
      if (data.morningExercises) setMorningExercises(data.morningExercises);
      if (data.eveningExercises) setEveningExercises(data.eveningExercises);
      if (data.childrenData) setChildrenData(data.childrenData);
      if (data.sleepRoutine) setSleepRoutine(data.sleepRoutine);
      if (data.englishWords) setEnglishWords(data.englishWords);
      if (data.englishState) setEnglishState(data.englishState);
      playGentleChime();
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset dashboard to default data for Muna Mohamed? All custom edits will be refreshed.')) {
      setProfile(initialProfile);
      setModules(initialCourseModules);
      setZoomClasses(initialZoomClasses);
      setPrayers(initialPrayers);
      setQuranProgress(initialQuranProgress);
      setFinanceData(initialFinanceData);
      setQuotes(initialQuotes);
      setRoutineTasks(initialRoutineTasks);
      setMorningExercises(initialMorningExercises);
      setEveningExercises(initialEveningExercises);
      setChildrenData(initialChildren);
      setSleepRoutine(initialSleepRoutine);
      setCalendarEvents(initialCalendarEvents);
      setNotifications(initialNotifications);
      setEnglishWords(initialEnglishWords);
      setEnglishState(initialEnglishLearningState);
      playGentleChime();
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        language,
        setLanguage,
        profile,
        updateProfile,
        modules,
        toggleModuleComplete,
        updateModule,
        zoomClasses,
        updateZoomClass,
        toggleZoomAttended,
        prayers,
        togglePrayer,
        updatePrayerTime,
        quranProgress,
        updateQuranProgress,
        markQuranReadToday,
        financeData,
        addIncomeRecord,
        deleteIncomeRecord,
        updateMonthlyTarget,
        toggleFinanceAlarm,
        showMilestoneCelebration,
        closeMilestoneCelebration,
        quotes,
        toggleFavoriteQuote,
        addCustomAffirmation,
        calendarEvents,
        addCalendarEvent,
        deleteCalendarEvent,
        updateCalendarEvent,
        routineTasks,
        toggleRoutineTask,
        addRoutineTask,
        deleteRoutineTask,
        morningExercises,
        eveningExercises,
        toggleExercise,
        children: childrenData,
        updateChild,
        addChild,
        deleteChild,
        toggleSubjectReviewed,
        addSubjectToChild,
        deleteSubjectFromChild,
        updateChildSubject,
        addReviewSession,
        toggleReviewSession,
        deleteReviewSession,
        toggleStudyReminder,
        updateStudyReminder,
        englishWords,
        grammarLessons,
        speakingTopics,
        listeningExercises,
        readingArticles,
        motivationalQuotes,
        englishState,
        updateEnglishState,
        toggleWordLearned,
        addCustomWord,
        toggleGrammarMastered,
        toggleSpeakingCompleted,
        toggleListeningCompleted,
        toggleReadingCompleted,
        toggleDailyChecklistItem,
        setEnglishStudyTime,
        recordEnglishStudyMinutes,
        sleepRoutine,
        updateSleepRoutine,
        toggleSleepChecklistItem,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        addNotification,
        chatMessages,
        addChatMessage,
        clearChat,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
