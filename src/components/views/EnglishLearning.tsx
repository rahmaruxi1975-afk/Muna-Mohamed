import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Languages,
  Clock,
  Flame,
  Volume2,
  VolumeX,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Mic,
  Headphones,
  FileText,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Search,
  Check,
  Award,
  ChevronRight,
  ArrowRight,
  Bell,
  Calendar,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { speakEnglishText, stopEnglishSpeech } from '../../utils/audio';
import { EnglishWord } from '../../types';

export const EnglishLearning: React.FC = () => {
  const {
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
    routineTasks,
    language,
  } = useDashboard();

  // Active section tab inside English Learning
  const [activeSubTab, setActiveSubTab] = useState<'vocabulary' | 'grammar' | 'speaking' | 'listening' | 'reading'>('vocabulary');

  // Daily Routine Configuration State
  const [studyTimeInput, setStudyTimeInput] = useState(englishState.studyTime || '14:00');
  const [durationInput, setDurationInput] = useState<number>(englishState.studyDurationMinutes || 30);
  const [reminderEnabled, setReminderEnabled] = useState(englishState.reminderEnabled ?? true);
  const [scheduleSavedFeedback, setScheduleSavedFeedback] = useState(false);

  // Audio Speech state
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Vocabulary Filtering & Search
  const [vocabCategory, setVocabCategory] = useState<string>('all');
  const [vocabSearch, setVocabSearch] = useState('');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardRevealed, setFlashcardRevealed] = useState(false);

  // Custom Word Modal
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newSomali, setNewSomali] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newCategory, setNewCategory] = useState<EnglishWord['category']>('Digital Marketing');

  // Grammar practice state
  const [grammarAnswers, setGrammarAnswers] = useState<Record<string, number>>({});
  const [grammarFeedback, setGrammarFeedback] = useState<Record<string, boolean>>({});

  // Speaking timer state
  const [speakingTimerActive, setSpeakingTimerActive] = useState(false);
  const [speakingTimeLeft, setSpeakingTimeLeft] = useState(60);
  const [speakingActiveTopicId, setSpeakingActiveTopicId] = useState<string | null>(null);

  // Listening player state
  const [listeningPlayingId, setListeningPlayingId] = useState<string | null>(null);
  const [listeningQuizAnswers, setListeningQuizAnswers] = useState<Record<string, number>>({});

  // Reading Comprehension quiz state
  const [readingQuizAnswers, setReadingQuizAnswers] = useState<Record<string, number>>({});

  // Motivational Quote state
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = motivationalQuotes[quoteIndex % motivationalQuotes.length] || motivationalQuotes[0];

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopEnglishSpeech();
    };
  }, []);

  // Speaking practice countdown timer
  useEffect(() => {
    let interval: any = null;
    if (speakingTimerActive && speakingTimeLeft > 0) {
      interval = setInterval(() => {
        setSpeakingTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (speakingTimeLeft === 0 && speakingTimerActive) {
      setSpeakingTimerActive(false);
      if (speakingActiveTopicId) {
        toggleSpeakingCompleted(speakingActiveTopicId);
        recordEnglishStudyMinutes(2);
      }
    }
    return () => clearInterval(interval);
  }, [speakingTimerActive, speakingTimeLeft, speakingActiveTopicId]);

  // Handle Speech Pronunciation
  const handlePronounce = (text: string, id: string, speedOverride?: number) => {
    if (speakingId === id) {
      stopEnglishSpeech();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    const speed = speedOverride !== undefined ? speedOverride : audioSpeed;
    speakEnglishText(text, speed, () => {
      setSpeakingId(null);
    });
  };

  // Save customized study session & sync to routine
  const handleSaveStudySchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setEnglishStudyTime(studyTimeInput, durationInput, true);
    updateEnglishState({
      studyTime: studyTimeInput,
      studyDurationMinutes: durationInput,
      reminderEnabled,
    });
    setScheduleSavedFeedback(true);
    setTimeout(() => setScheduleSavedFeedback(false), 4000);
  };

  // Find linked routine task for visual confirmation
  const linkedRoutineTask = routineTasks.find(
    (t) => t.category === 'English Study' || t.title.toLowerCase().includes('english')
  );

  // Calculate Progress Stats
  const learnedWordsCount = englishWords.filter((w) => w.learned).length;
  const masteredGrammarCount = englishState.grammarMastered.length;
  const completedSpeakingCount = englishState.speakingCompleted.length;
  const completedListeningCount = englishState.listeningCompleted.length;
  const completedReadingCount = englishState.readingCompleted.length;

  const checklistItems = [
    { key: 'vocabulary', label: 'Vocabulary Practice (3+ Words)', icon: Languages, done: englishState.dailyChecklist.vocabulary },
    { key: 'grammar', label: 'Grammar Rule & Quiz', icon: BookOpen, done: englishState.dailyChecklist.grammar },
    { key: 'speaking', label: 'Speaking Prompt Audio', icon: Mic, done: englishState.dailyChecklist.speaking },
    { key: 'listening', label: 'Listening Comprehension', icon: Headphones, done: englishState.dailyChecklist.listening },
    { key: 'reading', label: 'Reading Article & Notes', icon: FileText, done: englishState.dailyChecklist.reading },
  ] as const;

  const completedChecklistCount = checklistItems.filter((i) => i.done).length;
  const checklistPercentage = Math.round((completedChecklistCount / checklistItems.length) * 100);

  // Filtered Words
  const filteredWords = englishWords.filter((w) => {
    const matchesCat = vocabCategory === 'all' || w.category === vocabCategory;
    const somali = w.somaliMeaning || w.meaningSomali || '';
    const meaning = w.meaning || w.meaningEnglish || '';
    const matchesSearch =
      w.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      somali.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      meaning.toLowerCase().includes(vocabSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newSomali.trim()) return;
    addCustomWord({
      word: newWord.trim(),
      phonetic: newPhonetic.trim() || `/${newWord.toLowerCase()}/`,
      meaning: newMeaning.trim() || newWord.trim(),
      meaningEnglish: newMeaning.trim() || newWord.trim(),
      somaliMeaning: newSomali.trim(),
      meaningSomali: newSomali.trim(),
      example: newExample.trim() || `I practice using the word "${newWord}" in my marketing business.`,
      exampleSentence: newExample.trim() || `I practice using the word "${newWord}" in my marketing business.`,
      category: newCategory,
    });
    setNewWord('');
    setNewPhonetic('');
    setNewSomali('');
    setNewMeaning('');
    setNewExample('');
    setShowAddWordModal(false);
  };

  const handleGrammarQuizSelect = (lessonId: string, optionIdx: number, correctIdx: number) => {
    setGrammarAnswers((prev) => ({ ...prev, [lessonId]: optionIdx }));
    const isCorrect = optionIdx === correctIdx;
    setGrammarFeedback((prev) => ({ ...prev, [lessonId]: isCorrect }));
    if (isCorrect) {
      if (!englishState.grammarMastered.includes(lessonId)) {
        toggleGrammarMastered(lessonId);
      }
      recordEnglishStudyMinutes(5);
    }
  };

  const startSpeakingPractice = (topicId: string, seconds: number = 60) => {
    setSpeakingActiveTopicId(topicId);
    setSpeakingTimeLeft(seconds);
    setSpeakingTimerActive(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* SECTION 1: HEADER & ROUTINE SCHEDULER BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-3 backdrop-blur-sm border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering Muna's Global Communication & Business
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              English Learning & Mastery
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Dedicated daily practice for digital marketing, client communication, affiliate agreements, and global e-commerce confidence.
            </p>

            {/* Current Streak & Status Pills */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-amber-300 border border-amber-300/30 backdrop-blur-sm">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{englishState.streakDays || 5}-Day Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Scheduled: Daily at {linkedRoutineTask?.time || '02:00 PM'} ({englishState.studyDurationMinutes || 30} min)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-sky-200 border border-sky-300/30 backdrop-blur-sm">
                <Award className="w-4 h-4 text-sky-300" />
                <span>Target: Professional Digital Marketing Fluency</span>
              </div>
            </div>
          </div>

          {/* Routine Study Session Configurator Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 lg:w-96 shadow-inner shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Daily English Routine Time</span>
              </div>
              <span className="text-[11px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md font-mono">
                Auto-Syncs
              </span>
            </div>

            <form onSubmit={handleSaveStudySchedule} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-emerald-200 block mb-1">Study Start Time</label>
                  <input
                    type="time"
                    value={studyTimeInput}
                    onChange={(e) => setStudyTimeInput(e.target.value)}
                    className="w-full bg-white/20 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-emerald-200 block mb-1">Duration</label>
                  <select
                    value={durationInput}
                    onChange={(e) => setDurationInput(Number(e.target.value))}
                    className="w-full bg-gray-900/80 text-white rounded-lg px-2.5 py-1.5 text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes (Recommended)</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-100 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reminderEnabled}
                    onChange={(e) => setReminderEnabled(e.target.checked)}
                    className="rounded text-emerald-500 focus:ring-0 w-3.5 h-3.5 bg-white/20 border-white/30"
                  />
                  <span>Routine reminder alert</span>
                </label>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Save Schedule
                </button>
              </div>

              {scheduleSavedFeedback && (
                <div className="text-[11px] text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-2 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Scheduled into Daily Routine at {linkedRoutineTask?.time || '02:00 PM'}!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* SECTION 2: DAILY CHECKLIST & MOTIVATIONAL REMINDER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily English Consistency Checklist */}
        <div className="lg:col-span-2 bg-white dark:bg-[#161224] rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Today's English Study Checklist
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Complete daily habits to maintain your learning streak and accelerate vocabulary recall.
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {completedChecklistCount} / {checklistItems.length} ({checklistPercentage}%)
              </span>
              <div className="w-24 bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-1">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${checklistPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {checklistItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => toggleDailyChecklistItem(item.key)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    item.done
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-gray-50/70 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        item.done ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium truncate">{item.label}</span>
                  </div>
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}

            {/* Quick Practice Log */}
            <div className="p-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-transparent flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block">Total Practiced</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                  {englishState.totalMinutesLearned || 145} Minutes
                </span>
              </div>
              <button
                onClick={() => recordEnglishStudyMinutes(15)}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                title="Add 15 minutes of study to your log"
              >
                +15 Min
              </button>
            </div>
          </div>
        </div>

        {/* Daily English Motivational Reminder */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-[#211a14] dark:to-[#171318] rounded-2xl p-6 border border-amber-200/70 dark:border-amber-900/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                English Mindset Quote
              </span>
              <button
                onClick={() => setQuoteIndex((prev) => prev + 1)}
                className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <blockquote className="text-sm font-medium text-gray-900 dark:text-gray-100 italic leading-relaxed">
              "{currentQuote?.quoteEnglish || currentQuote?.quote}"
            </blockquote>

            <div className="mt-2.5 pt-2.5 border-t border-amber-200/50 dark:border-amber-900/30">
              <p className="text-xs text-amber-900/80 dark:text-amber-200/80 font-serif">
                "{currentQuote?.quoteSomali || currentQuote?.somaliTranslation}"
              </p>
              <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="font-medium">— {currentQuote?.author}</span>
                <span className="text-[10px] bg-amber-200/50 dark:bg-amber-900/40 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300">
                  {currentQuote?.context || currentQuote?.tip}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-2">
            <button
              onClick={() => handlePronounce(currentQuote?.quoteEnglish || currentQuote?.quote || '', 'quote-quote', 0.9)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                speakingId === 'quote-quote'
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-white dark:bg-gray-800 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100/50'
              }`}
            >
              {speakingId === 'quote-quote' ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>Listen to Quote</span>
            </button>
            <span className="text-[11px] text-gray-400">Card {((quoteIndex % motivationalQuotes.length) + 1)} of {motivationalQuotes.length}</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: NAVIGATION TABS FOR CURRICULUM MODULES */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('vocabulary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'vocabulary'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Vocabulary Practice</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSubTab === 'vocabulary' ? 'bg-emerald-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
            {learnedWordsCount}/{englishWords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('grammar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'grammar'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Grammar Lessons</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSubTab === 'grammar' ? 'bg-emerald-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
            {masteredGrammarCount}/{grammarLessons.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('speaking')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'speaking'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Speaking Practice</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSubTab === 'speaking' ? 'bg-emerald-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
            {completedSpeakingCount}/{speakingTopics.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('listening')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'listening'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Listening Exercises</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSubTab === 'listening' ? 'bg-emerald-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
            {completedListeningCount}/{listeningExercises.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('reading')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === 'reading'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Reading Practice</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSubTab === 'reading' ? 'bg-emerald-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
            {completedReadingCount}/{readingArticles.length}
          </span>
        </button>
      </div>

      {/* SUBTAB 1: VOCABULARY PRACTICE */}
      {activeSubTab === 'vocabulary' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#161224] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">Category:</span>
              {['all', 'Digital Marketing', 'Affiliate Marketing', 'Daily Life & Routine', 'Mindset & Success'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVocabCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    vocabCategory === cat
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All Words' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search word or Somali..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-56"
                />
              </div>

              <button
                onClick={() => setShowFlashcards(!showFlashcards)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  showFlashcards
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-amber-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showFlashcards ? 'Grid View' : 'Flashcard Mode'}</span>
              </button>

              <button
                onClick={() => setShowAddWordModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Word</span>
              </button>
            </div>
          </div>

          {/* Flashcard Practice Mode */}
          {showFlashcards && filteredWords.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-[#181428] dark:to-[#12101e] border-2 border-dashed border-emerald-300 dark:border-emerald-800 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-sm">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                <span>
                  Flashcard {flashcardIndex + 1} of {filteredWords.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-medium">
                  {filteredWords[flashcardIndex]?.category}
                </span>
              </div>

              <div
                onClick={() => setFlashcardRevealed(!flashcardRevealed)}
                className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-md min-h-[220px] flex flex-col justify-center items-center transition-all hover:scale-[1.01]"
              >
                <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                  {filteredWords[flashcardIndex]?.word}
                </h3>
                <span className="text-xs text-gray-400 font-mono mt-1">
                  {filteredWords[flashcardIndex]?.phonetic}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePronounce(filteredWords[flashcardIndex]?.word || '', `fc-${filteredWords[flashcardIndex]?.id}`);
                  }}
                  className="mt-3 p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {flashcardRevealed ? (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
                    <p className="text-base font-semibold text-emerald-700 dark:text-emerald-300">
                      Somali: {filteredWords[flashcardIndex]?.somaliMeaning || filteredWords[flashcardIndex]?.meaningSomali}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 max-w-md">
                      {filteredWords[flashcardIndex]?.meaning || filteredWords[flashcardIndex]?.meaningEnglish}
                    </p>
                    <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2 font-serif">
                      "{filteredWords[flashcardIndex]?.example || filteredWords[flashcardIndex]?.exampleSentence}"
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-6 animate-pulse">Click card to reveal Somali translation & meaning</p>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  disabled={flashcardIndex === 0}
                  onClick={() => {
                    setFlashcardIndex((prev) => Math.max(0, prev - 1));
                    setFlashcardRevealed(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (filteredWords[flashcardIndex]) {
                      toggleWordLearned(filteredWords[flashcardIndex].id);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                    filteredWords[flashcardIndex]?.learned
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{filteredWords[flashcardIndex]?.learned ? 'Learned!' : 'Mark as Learned'}</span>
                </button>
                <button
                  disabled={flashcardIndex >= filteredWords.length - 1}
                  onClick={() => {
                    setFlashcardIndex((prev) => Math.min(filteredWords.length - 1, prev + 1));
                    setFlashcardRevealed(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-40"
                >
                  Next Card
                </button>
              </div>
            </div>
          )}

          {/* Words Grid */}
          {!showFlashcards && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                    item.learned
                      ? 'bg-white dark:bg-[#161224] border-emerald-400/80 dark:border-emerald-800/80 shadow-sm'
                      : 'bg-white dark:bg-[#161224] border-gray-200 dark:border-gray-800 hover:border-gray-300'
                  }`}
                >
                  <div>
                    {/* Header Row: Word + Pronunciation + Audio */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white font-serif tracking-tight">
                            {item.word}
                          </h4>
                          <button
                            onClick={() => handlePronounce(item.word, `w-${item.id}`)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              speakingId === `w-${item.id}`
                                ? 'bg-emerald-600 text-white animate-pulse'
                                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                            }`}
                            title="Hear American English Pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono">{item.phonetic}</span>
                      </div>

                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {item.category}
                      </span>
                    </div>

                    {/* Somali Meaning (Highlight) */}
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                        Somali Meaning:
                      </span>
                      <p className="text-xs font-semibold text-emerald-950 dark:text-emerald-100 mt-0.5">
                        {item.somaliMeaning || item.meaningSomali}
                      </p>
                    </div>

                    {/* English Definition */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2.5 leading-relaxed">
                      {item.meaning || item.meaningEnglish}
                    </p>

                    {/* Example Sentence with Audio Button */}
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-start justify-between gap-2">
                      <p className="text-xs italic text-gray-500 dark:text-gray-400 leading-relaxed font-serif">
                        "{item.example || item.exampleSentence}"
                      </p>
                      <button
                        onClick={() => handlePronounce(item.example || item.exampleSentence || '', `ex-${item.id}`, 0.9)}
                        className={`p-1 rounded text-gray-400 hover:text-emerald-600 shrink-0 ${
                          speakingId === `ex-${item.id}` ? 'text-emerald-600 animate-pulse' : ''
                        }`}
                        title="Pronounce entire example sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Footer Mark as Learned */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      {item.isCustom ? 'Custom added' : 'Curriculum Word'}
                    </span>
                    <button
                      onClick={() => toggleWordLearned(item.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        item.learned
                          ? 'bg-emerald-500 text-white font-semibold'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{item.learned ? 'Learned' : 'Mark Learned'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: GRAMMAR LESSONS */}
      {activeSubTab === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#161224] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                Business & Conversational Grammar for Entrepreneurs
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Practical, high-impact grammar rules you need when writing marketing emails, pitching products, and speaking with clients.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
              {masteredGrammarCount} of {grammarLessons.length} Mastered
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {grammarLessons.map((lesson) => {
              const isMastered = englishState.grammarMastered.includes(lesson.id);
              const selectedAnswer = grammarAnswers[lesson.id];
              const isFeedbackVisible = grammarFeedback[lesson.id] !== undefined;
              const isAnswerCorrect = grammarFeedback[lesson.id];

              return (
                <div
                  key={lesson.id}
                  className={`bg-white dark:bg-[#161224] rounded-2xl p-6 border transition-all ${
                    isMastered
                      ? 'border-emerald-400 dark:border-emerald-800 shadow-sm'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                          {lesson.level}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                          {lesson.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {lesson.summary || lesson.explanation}
                      </p>
                      {lesson.somaliExplanation && (
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5 font-medium">
                          Sharaxaad Somali: {lesson.somaliExplanation}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => toggleGrammarMastered(lesson.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                        isMastered
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isMastered ? 'Lesson Mastered' : 'Mark as Mastered'}</span>
                    </button>
                  </div>

                  {/* Formula / Rule Box */}
                  {(() => {
                    const firstRule = lesson.rules?.[0];
                    const formulaText = lesson.formula || (firstRule ? `${firstRule.rule}: ${firstRule.explanation}` : '');
                    const pronounceExample = firstRule?.example || '';
                    return (
                      <div className="mt-4 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700 font-mono text-xs text-gray-800 dark:text-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans font-semibold">
                            Formula / Core Rule:
                          </span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{formulaText}</span>
                        </div>
                        {pronounceExample && (
                          <button
                            onClick={() => handlePronounce(pronounceExample, `rule-${lesson.id}`)}
                            className="p-1.5 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-emerald-600"
                            title="Hear example pronounced"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* Real-World Examples */}
                  {(() => {
                    const displayExamples: Array<{ en: string; so: string }> = lesson.rules
                      ? lesson.rules.map((r) => ({ en: r.example, so: r.explanation }))
                      : ((lesson.examples as any[]) || []).map((ex: any) => ({
                          en: typeof ex === 'string' ? ex : (ex.en || ex.english || ''),
                          so: typeof ex === 'string' ? '' : (ex.so || ex.somali || ex.note || ''),
                        }));

                    return (
                      <div className="mt-4 space-y-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                          Real-World Business Examples:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {displayExamples.map((ex, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-start justify-between gap-2"
                            >
                              <div>
                                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                  "{ex.en}"
                                </p>
                                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">
                                  {ex.so}
                                </p>
                              </div>
                              <button
                                onClick={() => handlePronounce(ex.en, `g-ex-${lesson.id}-${idx}`, 0.9)}
                                className="p-1 text-gray-400 hover:text-emerald-600 shrink-0"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Mini-Quiz Practice */}
                  {(() => {
                    const activeQuiz = lesson.quiz?.[0] || lesson.practiceQuiz;
                    if (!activeQuiz) return null;

                    return (
                      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                          <HelpCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            Check Your Understanding: {activeQuiz.question}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                          {activeQuiz.options.map((opt: string, optIdx: number) => {
                            const isChosen = selectedAnswer === optIdx;
                            const isCorrectOption = optIdx === activeQuiz.correctIndex;
                            let btnStyle = 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';

                            if (isFeedbackVisible && isChosen) {
                              btnStyle = isCorrectOption
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-red-600 text-white border-red-600';
                            } else if (isFeedbackVisible && isCorrectOption) {
                              btnStyle = 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-400';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleGrammarQuizSelect(lesson.id, optIdx, activeQuiz.correctIndex)}
                                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {isFeedbackVisible && (
                          <div className="mt-2 text-xs flex items-center gap-1.5">
                            {isAnswerCorrect ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Correct! Masha'Allah, you mastered this rule!
                              </span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400 font-medium">
                                Try again: Notice the correct verb agreement or connector.
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: SPEAKING PRACTICE */}
      {activeSubTab === 'speaking' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#161224] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-emerald-600" />
                Active Speaking & Pronunciation Workshop
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Listen to high-converting native speaking templates, practice speaking out loud with the timer, and gain confidence.
              </p>
            </div>
            {speakingTimerActive && (
              <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl px-4 py-2 animate-pulse">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300 font-mono">
                  Speaking Timer: {speakingTimeLeft}s
                </span>
                <button
                  onClick={() => setSpeakingTimerActive(false)}
                  className="text-xs text-rose-600 underline font-medium"
                >
                  Stop
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {speakingTopics.map((topic) => {
              const isCompleted = englishState.speakingCompleted.includes(topic.id);
              const isSpeakingThis = speakingActiveTopicId === topic.id && speakingTimerActive;

              return (
                <div
                  key={topic.id}
                  className={`bg-white dark:bg-[#161224] rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                    isCompleted
                      ? 'border-emerald-400 dark:border-emerald-800 shadow-sm'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200">
                          {topic.category || topic.difficulty || 'Speaking Practice'}
                        </span>
                        <h4 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                          {topic.prompt || topic.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => toggleSpeakingCompleted(topic.id)}
                        className={`p-1.5 rounded-lg ${
                          isCompleted
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title="Mark speaking completed"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Guiding Questions / Situation */}
                    {(() => {
                      const points = topic.guidingQuestions || (topic.situation ? [topic.situation] : []);
                      if (points.length === 0) return null;
                      return (
                        <div className="mb-4">
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold block mb-1">
                            Talking Points / Context:
                          </span>
                          <ul className="space-y-1">
                            {points.map((q: string, qIdx: number) => (
                              <li key={qIdx} className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })()}

                    {/* Useful Vocabulary / Key Phrases */}
                    {(() => {
                      const vocab = topic.usefulVocab || topic.keyPhrases || [];
                      if (vocab.length === 0) return null;
                      return (
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {vocab.map((v: string, vIdx: number) => (
                            <span
                              key={vIdx}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                            >
                              +{v}
                            </span>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Model Sample Answer */}
                    {(() => {
                      const answerText = topic.sampleAnswer || topic.sampleResponse || '';
                      if (!answerText) return null;
                      return (
                        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                              Fluent Model Answer:
                            </span>
                            <button
                              onClick={() => handlePronounce(answerText, `spk-${topic.id}`, 0.95)}
                              className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded ${
                                speakingId === `spk-${topic.id}`
                                  ? 'bg-emerald-600 text-white animate-pulse'
                                  : 'text-emerald-700 dark:text-emerald-400 hover:underline'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen Model</span>
                            </button>
                          </div>
                          <p className="text-xs italic text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
                            "{answerText}"
                          </p>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Practice Timer Controls */}
                  <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Target Duration: 60 seconds</span>
                    <button
                      onClick={() => startSpeakingPractice(topic.id, 60)}
                      disabled={isSpeakingThis}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                        isSpeakingThis
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{isSpeakingThis ? `Speaking (${speakingTimeLeft}s)` : 'Start 60s Practice'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 4: LISTENING EXERCISES */}
      {activeSubTab === 'listening' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#161224] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-emerald-600" />
                Listening Comprehension & Audio Dialogues
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Listen to realistic client conversations, digital marketing discussions, and answer the comprehension checks.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">Audio Speed:</span>
              {[0.8, 1.0, 1.2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setAudioSpeed(spd)}
                  className={`px-2 py-0.5 rounded text-xs font-mono ${
                    audioSpeed === spd
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {listeningExercises.map((exercise) => {
              const isCompleted = englishState.listeningCompleted.includes(exercise.id);
              const isPlaying = speakingId === `list-${exercise.id}`;
              const userAnswer = listeningQuizAnswers[exercise.id];
              const activeQuestion = exercise.questions?.[0] || exercise.comprehensionQuestion;
              const isAnswerCorrect = activeQuestion && userAnswer === activeQuestion.correctIndex;
              const durationText = exercise.duration || (exercise.difficulty ? `${exercise.difficulty} • 3-5m` : '3m');
              const summaryText = exercise.somaliSummary || exercise.context || '';

              return (
                <div
                  key={exercise.id}
                  className={`bg-white dark:bg-[#161224] rounded-2xl p-6 border transition-all ${
                    isCompleted
                      ? 'border-emerald-400 dark:border-emerald-800 shadow-sm'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200">
                          {durationText}
                        </span>
                        <h4 className="text-base font-bold text-gray-900 dark:text-white font-serif">
                          {exercise.title}
                        </h4>
                      </div>
                      {summaryText && (
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
                          {summaryText}
                        </p>
                      )}
                    </div>

                    {/* Play Audio Button */}
                    <button
                      onClick={() => handlePronounce(exercise.audioScript, `list-${exercise.id}`)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
                        isPlaying
                          ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'Pause Audio' : 'Play Audio Exercise'}</span>
                    </button>
                  </div>

                  {/* Audio Transcript Box */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 font-serif text-xs text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                    {exercise.audioScript}
                  </div>

                  {/* Comprehension Quiz */}
                  {activeQuestion && (
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5 mb-2">
                        <HelpCircle className="w-4 h-4 text-emerald-600" />
                        Comprehension Question: {activeQuestion.question}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {activeQuestion.options.map((opt: string, optIdx: number) => {
                          const isSelected = userAnswer === optIdx;
                          let btnClass = 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
                          if (userAnswer !== undefined) {
                            if (optIdx === activeQuestion.correctIndex) {
                              btnClass = 'bg-emerald-600 text-white border-emerald-600';
                            } else if (isSelected) {
                              btnClass = 'bg-rose-600 text-white border-rose-600';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setListeningQuizAnswers((prev) => ({ ...prev, [exercise.id]: optIdx }));
                                if (optIdx === activeQuestion.correctIndex) {
                                  toggleListeningCompleted(exercise.id);
                                  recordEnglishStudyMinutes(10);
                                }
                              }}
                              className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {userAnswer !== undefined && (
                        <p className="text-xs font-semibold mt-2 flex items-center gap-1">
                          {isAnswerCorrect ? (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Excellent! You comprehended the audio correctly.
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400">
                              Listen once more to identify the key detail.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 5: READING PRACTICE */}
      {activeSubTab === 'reading' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#161224] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Reading Practice & Mindset Articles
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Short educational articles focused on online marketing, digital products, and productive daily routines.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
              {completedReadingCount} of {readingArticles.length} Read
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {readingArticles.map((article) => {
              const isCompleted = englishState.readingCompleted.includes(article.id);
              const userAnswer = readingQuizAnswers[article.id];
              const activeQuestion = article.comprehensionQuestions?.[0] || article.comprehensionQuestion;
              const isAnswerCorrect = activeQuestion && userAnswer === activeQuestion.correctIndex;
              const readTimeText = article.readTime || `${article.estimatedMinutes || 4} min read`;
              const articleBody: string = typeof article.content === 'string' ? article.content : (Array.isArray(article.body) ? article.body.join('\n\n') : (article.body || ''));
              const vocabList: string[] = article.vocabularyHighlights
                ? article.vocabularyHighlights.map((v) => `${v.word}: ${v.somali}`)
                : Array.isArray(article.keyVocab)
                ? (article.keyVocab as any[]).map((v) => (typeof v === 'string' ? v : `${v.word}: ${v.somali}`))
                : [];

              return (
                <div
                  key={article.id}
                  className={`bg-white dark:bg-[#161224] rounded-2xl p-6 border transition-all ${
                    isCompleted
                      ? 'border-emerald-400 dark:border-emerald-800 shadow-sm'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {readTimeText}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white font-serif mt-1">
                        {article.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePronounce(articleBody, `read-${article.id}`, 0.95)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          speakingId === `read-${article.id}`
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Read Aloud</span>
                      </button>

                      <button
                        onClick={() => toggleReadingCompleted(article.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Completed' : 'Mark as Read'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 font-serif">
                    {articleBody.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Key Vocab Highlight Pills */}
                  {vocabList.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold text-gray-500">Key Vocab in Article:</span>
                      {vocabList.map((v, vIdx) => (
                        <span
                          key={vIdx}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Comprehension Quiz */}
                  {activeQuestion && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5 mb-2">
                        <HelpCircle className="w-4 h-4 text-emerald-600" />
                        Comprehension Question: {activeQuestion.question}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {activeQuestion.options.map((opt: string, optIdx: number) => {
                          const isSelected = userAnswer === optIdx;
                          let btnClass = 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
                          if (userAnswer !== undefined) {
                            if (optIdx === activeQuestion.correctIndex) {
                              btnClass = 'bg-emerald-600 text-white border-emerald-600';
                            } else if (isSelected) {
                              btnClass = 'bg-rose-600 text-white border-rose-600';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setReadingQuizAnswers((prev) => ({ ...prev, [article.id]: optIdx }));
                                if (optIdx === activeQuestion.correctIndex) {
                                  toggleReadingCompleted(article.id);
                                  recordEnglishStudyMinutes(15);
                                }
                              }}
                              className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {userAnswer !== undefined && (
                        <p className="text-xs font-semibold mt-2 flex items-center gap-1">
                          {isAnswerCorrect ? (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Correct! You understood the key takeaway of this article.
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400">
                              Review the paragraph discussing marketing distribution and digital products.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM WORD */}
      {showAddWordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161224] rounded-3xl p-6 max-w-lg w-full border border-gray-200 dark:border-gray-800 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Add New English Vocabulary
              </h3>
              <button
                onClick={() => setShowAddWordModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddCustomWord} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                  English Word / Term *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Conversion Rate, Lead Magnet, Funnel"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                    Somali Translation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Boqolleyda iibka, Soo jiidashada macmiilka"
                    value={newSomali}
                    onChange={(e) => setNewSomali(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Affiliate Marketing">Affiliate Marketing</option>
                    <option value="Daily Life & Routine">Daily Life & Routine</option>
                    <option value="Mindset & Success">Mindset & Success</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                  English Definition / Explanation
                </label>
                <input
                  type="text"
                  placeholder="e.g., The percentage of website visitors who buy a product."
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                  Example Sentence
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., My Stan Store had a high conversion rate this week."
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddWordModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                >
                  Save Vocabulary Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
