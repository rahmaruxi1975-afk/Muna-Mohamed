import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  GraduationCap,
  Calendar,
  Video,
  Moon,
  DollarSign,
  Heart,
  Activity,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Clock,
  Sparkles,
  ExternalLink,
  Languages,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    profile,
    modules,
    zoomClasses,
    prayers,
    togglePrayer,
    quranProgress,
    financeData,
    routineTasks,
    toggleRoutineTask,
    morningExercises,
    eveningExercises,
    children,
    sleepRoutine,
    englishState,
    englishWords,
    setActiveTab,
    quotes,
  } = useDashboard();

  // Calculation metrics
  const completedModules = modules.filter((m) => m.completed).length;
  const coursePercent = Math.round((completedModules / modules.length) * 100);
  const activeModule = modules.find((m) => !m.completed) || modules[0];

  const totalIncome = financeData.records.reduce((sum, r) => sum + r.amount, 0);
  const incomePercent = Math.min(Math.round((totalIncome / financeData.monthlyTarget) * 100), 100);

  const completedPrayers = prayers.filter((p) => p.completed).length;
  const completedTasks = routineTasks.filter((t) => t.completed).length;
  const totalDailyRoutine = routineTasks.length;
  const dailyProgressPercent = totalDailyRoutine > 0 ? Math.round((completedTasks / totalDailyRoutine) * 100) : 0;

  const totalExercises = morningExercises.length + eveningExercises.length;
  const completedExercises =
    morningExercises.filter((e) => e.completed).length + eveningExercises.filter((e) => e.completed).length;

  // Next Zoom Class
  const nextZoom = zoomClasses[0];

  // Bedtime countdown (10:00 PM)
  const [bedtimeCountdown, setBedtimeCountdown] = useState('');
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = sleepRoutine.bedtime.split(':').map(Number);
      const bedDate = new Date();
      bedDate.setHours(hours, minutes, 0, 0);

      // If already past bedtime today, target tomorrow
      if (now > bedDate) {
        bedDate.setDate(bedDate.getDate() + 1);
      }

      const diffMs = bedDate.getTime() - now.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setBedtimeCountdown(`${diffHours}h ${diffMins}m until bedtime`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, [sleepRoutine.bedtime]);

  // Daily featured quote
  const featuredQuote = quotes.find((q) => q.isFavorite) || quotes[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner: Greeting & Daily Motivational Focus */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D1B4E] via-[#3B2266] to-[#1E1238] text-white p-6 md:p-8 shadow-xl border border-[#7C3AED]/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-56 h-56 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#D8B4FE]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Somali Wealth Academy Student Operating System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-display tracking-tight leading-tight">
              Assalamu Alaikum, Muna
            </h2>
            <p className="text-sm md:text-base text-[#E9D5FF]/90 font-light leading-relaxed">
              "{profile.motivationalStatement}"
            </p>
          </div>

          {/* Key Quick Stats Badge */}
          <div className="flex sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-300">Quran Streak</p>
                <p className="text-lg font-bold text-white">{quranProgress.streakDays} Days</p>
              </div>
            </div>

            <div className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#7C3AED]/30 text-[#D8B4FE]">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-gray-300">Target Progress</p>
                <p className="text-lg font-bold text-[#D4AF37]">
                  ${totalIncome} <span className="text-xs text-gray-300 font-normal">/ ${financeData.monthlyTarget}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: High Priority Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Somali Wealth Academy Course Progress */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#FAF5FF] dark:bg-[#2B1B47] text-[#7C3AED] dark:text-[#D8B4FE]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Somali Wealth Academy</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">26 Core Modules</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('course')}
                className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline flex items-center gap-0.5"
              >
                View <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
                <span className="font-bold text-[#7C3AED] dark:text-[#C4B5FD]">{coursePercent}% ({completedModules}/26)</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] h-full rounded-full transition-all duration-500"
                  style={{ width: `${coursePercent}%` }}
                />
              </div>
            </div>

            {/* Current Active Module Card */}
            <div className="p-3.5 bg-[#FAF5FF] dark:bg-[#201538] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#C4B5FD]">
                Current Focus Module
              </span>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                Module {activeModule?.number}: {activeModule?.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {activeModule?.notes || 'Review lessons and complete practical setup.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Next revision: {activeModule?.revisionDate || 'This week'}</span>
            <span className="font-medium text-[#D4AF37]">4 classes / wk</span>
          </div>
        </div>

        {/* 2. Upcoming Zoom Class (4x/wk) */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#D4AF37]">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Upcoming Zoom Class</h3>
                  <p className="text-[11px] text-[#D4AF37] font-semibold">4 Sessions Every Week</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('course')}
                className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline flex items-center gap-0.5"
              >
                Schedule <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 bg-gradient-to-br from-amber-50/70 to-purple-50/50 dark:from-amber-950/20 dark:to-purple-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-700/30 mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-gray-900 dark:text-white">{nextZoom.dayOfWeek} at {nextZoom.time}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                  Confirmed
                </span>
              </div>
              <p className="text-sm font-bold text-[#4C1D95] dark:text-[#E9D5FF] line-clamp-1">
                {nextZoom.topic}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {nextZoom.instructorNotes}
              </p>
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <a
              href={nextZoom.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Join Zoom Session
            </a>
            <p className="text-[11px] text-gray-400 text-center">Reminder set {nextZoom.reminderMinutesBefore}m before</p>
          </div>
        </div>

        {/* 3. Monthly Financial Goal ($300 Target) */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Monthly Income Goal</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">Affiliate & Digital Sales</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('finance')}
                className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline flex items-center gap-0.5"
              >
                Track <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 bg-[#F0FDF4] dark:bg-[#11271D] rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 mb-3">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">${totalIncome}</span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Target: ${financeData.monthlyTarget}
                </span>
              </div>
              <div className="w-full bg-emerald-200/50 dark:bg-emerald-950 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${incomePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-600 dark:text-gray-300">
                <span>{incomePercent}% achieved</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${Math.max(0, financeData.monthlyTarget - totalIncome)} remaining
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              "When you reach $300, a celebratory milestone alert with sound will trigger automatically!"
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
            <button
              onClick={() => setActiveTab('finance')}
              className="w-full py-2 px-3 rounded-xl border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Income Record
            </button>
          </div>
        </div>
      </div>

      {/* English Learning Daily Routine Spotlight Card */}
      <div className="bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-indigo-950/90 text-white rounded-3xl p-5 md:p-6 border border-emerald-500/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 shrink-0">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white font-serif">
                English Learning Routine
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {englishState.streakDays || 5}-Day Streak
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
                Daily at {englishState.studyTime || '02:00 PM'} ({englishState.studyDurationMinutes || 30}m)
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
              Daily vocabulary practice, grammar lessons, speaking prompts, and listening exercises tailored for your digital marketing success.
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-emerald-200/90">
              <span>{englishWords.filter((w) => w.learned).length} / {englishWords.length} Words Mastered</span>
              <span>•</span>
              <span>{englishState.grammarMastered.length} Grammar Lessons Completed</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('english')}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span>Start English Session</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Spiritual Wellness, Routine Tasks, and Family/Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Spiritual Wellness: Prayers & Quran */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FAF5FF] dark:bg-[#2B1B47] text-[#7C3AED] dark:text-[#D8B4FE]">
                <Moon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Daily Prayers & Quran</h3>
            </div>
            <button
              onClick={() => setActiveTab('spiritual')}
              className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline"
            >
              Full Details
            </button>
          </div>

          {/* 5 Prayers Checklist */}
          <div className="grid grid-cols-5 gap-1.5">
            {prayers.map((prayer) => (
              <button
                key={prayer.id}
                onClick={() => togglePrayer(prayer.id)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  prayer.completed
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-[#7C3AED]'
                }`}
              >
                <p className="text-[11px] font-bold">{prayer.name}</p>
                <p className="text-[9px] opacity-75">{prayer.time}</p>
                <div className="mt-1 flex justify-center">
                  {prayer.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Quran Progress Snapshot */}
          <div className="p-4 bg-[#FAF5FF] dark:bg-[#201538] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#4C1D95] dark:text-[#E9D5FF]">{quranProgress.surahName}</span>
              <span className="text-[11px] text-[#7C3AED] dark:text-[#C4B5FD] font-semibold">
                Ayah {quranProgress.ayahProgress} / {quranProgress.totalAyahsInSurah}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden my-2">
              <div
                className="bg-[#7C3AED] h-full rounded-full"
                style={{ width: `${Math.round((quranProgress.ayahProgress / quranProgress.totalAyahsInSurah) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2 italic">
              "{quranProgress.reflections}"
            </p>
          </div>
        </div>

        {/* Today's Tasks & Routine Checklist */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#7C3AED]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Today's Routine Timeline</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE]">
              {dailyProgressPercent}% Completed
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {routineTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                onClick={() => toggleRoutineTask(task.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                  task.completed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30 text-gray-500 line-through'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-[#7C3AED]/40'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  <span className="truncate font-medium">{task.title}</span>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{task.time}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('daily-planner')}
            className="w-full py-2 text-center text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline"
          >
            View Full Daily Routine Builder →
          </button>
        </div>

        {/* Children's Study & Bedtime Countdown */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Children Study Block */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Children's Study Time</h3>
                </div>
                <button
                  onClick={() => setActiveTab('children')}
                  className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline"
                >
                  Manage
                </button>
              </div>

              <div className="space-y-2">
                {children.map((child) => {
                  const reviewedCount = child.subjects.filter((s) => s.reviewedToday).length;
                  return (
                    <div
                      key={child.id}
                      className="p-2.5 rounded-xl bg-[#FAF5FF] dark:bg-[#201538] border border-[#E9D5FF]/60 dark:border-[#38235E] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">{child.name}</span>
                        <span className="text-[10px] text-gray-500 ml-1.5">({child.gradeOrAge})</span>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Review: {child.dailyReviewTime}</p>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#D8B4FE]">
                        {reviewedCount}/{child.subjects.length} Reviewed
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sleep Reminder Card */}
            <div className="p-3.5 bg-gradient-to-r from-purple-900/10 to-indigo-900/10 dark:from-purple-950/40 dark:to-indigo-950/40 rounded-2xl border border-purple-200/50 dark:border-purple-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#7C3AED]" /> Target Bedtime: 10:00 PM
                </span>
                <span className="text-[10px] font-semibold text-[#7C3AED] dark:text-[#D8B4FE]">
                  {sleepRoutine.consistencyStreak} Day Streak
                </span>
              </div>
              <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD] mt-0.5">
                {bedtimeCountdown}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                "Muna, it is time to rest. Tomorrow is another opportunity to grow."
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-rose-500" /> Exercises: {completedExercises}/{totalExercises}
            </span>
            <button
              onClick={() => setActiveTab('health')}
              className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline"
            >
              Start Routine →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
