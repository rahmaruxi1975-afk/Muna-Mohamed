export type NavTab =
  | 'dashboard'
  | 'course'
  | 'calendar'
  | 'daily-planner'
  | 'spiritual'
  | 'finance'
  | 'health'
  | 'children'
  | 'english'
  | 'ai-coach'
  | 'motivation'
  | 'profile'
  | 'settings';

export type Language = 'en' | 'ar' | 'so';

export interface UserProfile {
  name: string;
  avatarUrl: string;
  roles: string[];
  bio: string;
  learningGoals: string[];
  monthlyGoals: string[];
  motivationalStatement: string;
  email: string;
  location: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  category: 'Foundation' | 'Marketing' | 'Ecommerce & Platforms' | 'Digital Products' | 'Advanced & Growth';
  completed: boolean;
  notes: string;
  assignments: string[];
  practiceTasks: string[];
  instructorQuestions: string;
  revisionDate: string;
  resources: { title: string; url: string }[];
}

export interface ZoomClass {
  id: string;
  dayOfWeek: string; // e.g. 'Monday', 'Wednesday', 'Friday', 'Sunday'
  time: string; // '19:00' (7:00 PM)
  topic: string;
  meetingLink: string;
  instructorNotes: string;
  attended: boolean;
  reminderMinutesBefore: number;
}

export interface PrayerItem {
  id: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  name: string;
  arabicName: string;
  somaliName: string;
  time: string;
  completed: boolean;
  reminderEnabled: boolean;
}

export interface QuranProgress {
  dailyGoalPages: number;
  surahName: string;
  surahNumber: number;
  ayahProgress: number;
  totalAyahsInSurah: number;
  completedToday: boolean;
  streakDays: number;
  reflections: string;
  history: { date: string; surah: string; ayahsRead: number }[];
}

export interface IncomeRecord {
  id: string;
  amount: number;
  source: string;
  date: string;
  note: string;
}

export interface FinanceData {
  monthlyTarget: number;
  records: IncomeRecord[];
  alarmSoundEnabled: boolean;
  milestoneReachedAlertShownForMonth: string; // YYYY-MM
  currency: string;
}

export interface QuoteItem {
  id: string;
  category:
    | 'Self-confidence'
    | 'Discipline'
    | 'Faith'
    | 'Learning'
    | 'Business'
    | 'Motherhood'
    | 'Patience'
    | 'Personal growth'
    | 'Financial independence';
  english: string;
  arabic?: string;
  somali?: string;
  author?: string;
  isFavorite: boolean;
  isCustom?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  category:
    | 'zoom'
    | 'prayer'
    | 'quran'
    | 'exercise'
    | 'children'
    | 'study'
    | 'business'
    | 'rest'
    | 'appointment'
    | 'sleep';
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  reminderMinutes?: number;
  completed?: boolean;
}

export interface RoutineTask {
  id: string;
  time: string; // e.g. '05:00 AM'
  title: string;
  category:
    | 'Worship'
    | 'Quran'
    | 'Exercise'
    | 'Academy Study'
    | 'English Study'
    | 'Marketing'
    | 'Content'
    | 'Children'
    | 'Family'
    | 'Night Routine';
  completed: boolean;
  durationMinutes: number;
  reminderEnabled: boolean;
}

export interface ExerciseRoutineItem {
  id: string;
  name: string;
  type: 'stretch' | 'walk' | 'mobility' | 'bodyweight' | 'breathing';
  targetDurationMinutes: number;
  completed: boolean;
  instructions: string;
}

export interface ChildSubject {
  id: string;
  name: string;
  currentTopic: string;
  homeworkDue: string;
  dueDate?: string;
  reviewedToday: boolean;
  difficultTopicsNotes: string;
}

export interface ReviewSession {
  id: string;
  date: string;
  time: string;
  topicOrGoal: string;
  completed: boolean;
  notes?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  gradeLevel: string;
  gradeOrAge: string;
  subjects: ChildSubject[];
  dailyReviewTime: string; // e.g. "17:00 - 18:00"
  studyReminderEnabled: boolean;
  studyReminderTime: string; // e.g. "17:00"
  studyNotes: string;
  reviewSessions: ReviewSession[];
}

export interface SleepRoutineData {
  bedtime: string; // '22:00' (10:00 PM)
  reminderMinutesBefore: number;
  screenFreeGoalMinutes: number;
  checklist: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  consistencyStreak: number;
  alarmEnabled: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'zoom' | 'prayer' | 'finance' | 'sleep' | 'study' | 'general';
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface EnglishWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech?: string;
  meaning?: string;
  meaningEnglish?: string;
  somaliMeaning?: string;
  meaningSomali?: string;
  arabicMeaning?: string;
  example?: string;
  exampleSentence?: string;
  collocationOrTip?: string;
  category: 'Business & Digital' | 'Daily Life' | 'Mindset & Growth' | 'Conversation' | 'Academic' | string;
  learned: boolean;
  isCustom?: boolean;
}

export interface EnglishGrammarLesson {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  summary: string;
  explanation?: string;
  somaliExplanation?: string;
  formula?: string;
  examples?: Array<{ english: string; somali?: string; note?: string } | string>;
  practiceQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  };
  rules?: {
    rule: string;
    example: string;
    explanation: string;
  }[];
  commonMistakes?: {
    wrong: string;
    correct: string;
    why: string;
  }[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
}

export interface EnglishSpeakingTopic {
  id: string;
  title: string;
  situation?: string;
  category?: string;
  prompt: string;
  guidingQuestions?: string[];
  usefulVocab?: string[];
  keyPhrases?: string[];
  sampleAnswer?: string;
  sampleResponse?: string;
  pronunciationTips?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
}

export interface EnglishListeningExercise {
  id: string;
  title: string;
  context?: string;
  speaker?: string;
  audioScript: string;
  duration?: string;
  somaliSummary?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  comprehensionQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  };
  questions?: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
}

export interface EnglishReadingArticle {
  id: string;
  title: string;
  category?: string;
  readTime?: string;
  estimatedMinutes?: number;
  content?: string;
  body?: string[] | string;
  keyVocab?: Array<{ word: string; meaning: string; somali: string } | string>;
  vocabularyHighlights?: { word: string; definition: string; somali: string }[];
  comprehensionQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  };
  comprehensionQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
}

export interface EnglishMotivationalQuote {
  id: string;
  quote: string;
  quoteEnglish?: string;
  author: string;
  somaliTranslation: string;
  quoteSomali?: string;
  arabicTranslation?: string;
  tip: string;
  context?: string;
}

export interface EnglishLearningState {
  studyTime: string; // e.g. "14:00" (02:00 PM)
  studyDurationMinutes: number; // e.g. 30
  reminderEnabled: boolean;
  reminderTime: string; // e.g. "14:00"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  streakDays: number;
  totalMinutesLearned: number;
  wordsLearned: string[]; // word IDs
  grammarMastered: string[]; // lesson IDs
  speakingCompleted: string[]; // topic IDs
  listeningCompleted: string[]; // exercise IDs
  readingCompleted: string[]; // article IDs
  dailyChecklist: {
    vocabulary: boolean;
    grammar: boolean;
    speaking: boolean;
    listening: boolean;
    reading: boolean;
  };
  lastActiveDate: string; // YYYY-MM-DD
  personalGoalNotes: string;
}

