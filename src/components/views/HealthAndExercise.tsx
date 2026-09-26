import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Activity,
  Sun,
  Moon,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Heart,
  Droplets,
  Eye,
  Coffee,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

export const HealthAndExercise: React.FC = () => {
  const {
    morningExercises,
    eveningExercises,
    toggleExercise,
  } = useDashboard();

  // Timer State
  const [activeRoutine, setActiveRoutine] = useState<'morning' | 'evening'>('morning');
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes default
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isRunning) {
      setIsRunning(false);
      playGentleChime();
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = (duration: number = 600) => {
    setIsRunning(false);
    setTimerSeconds(duration);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const morningDone = morningExercises.filter((e) => e.completed).length;
  const eveningDone = eveningExercises.filter((e) => e.completed).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#2D1236] via-[#3A1744] to-[#1F0C25] text-white p-6 md:p-8 border border-rose-500/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-rose-300">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Mother & Student Wellness
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display">
              Health, Gentle Mobility & Energy
            </h2>
            <p className="text-sm text-rose-100/90 leading-relaxed">
              Tailored specifically for Muna's busy routine as a mother and dedicated academy student. Gentle 10-15 minute routines to protect your posture, relieve tension, and maintain vibrant energy.
            </p>
          </div>

          {/* Interactive Live Timer */}
          <div className="p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 text-center shrink-0 min-w-[200px]">
            <span className="text-[11px] font-semibold text-rose-200 uppercase tracking-wider block mb-1">
              Routine Session Timer
            </span>
            <span className="text-4xl font-bold font-mono text-white block my-1">
              {formatTime(timerSeconds)}
            </span>
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={handleStartPause}
                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                title={isRunning ? 'Pause Timer' : 'Start Timer'}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleReset(600)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Reset to 10 mins"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleReset(900)}
                className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Set to 15 mins"
              >
                15m
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Routine Selectors: Morning vs Evening */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Morning Gentle Movement (10-15m) */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
                  Morning Mobility & Energy
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">10–15 mins after Fajr</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#7C3AED] dark:text-[#C4B5FD]">
              {morningDone}/{morningExercises.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {morningExercises.map((ex) => (
              <div
                key={ex.id}
                onClick={() => toggleExercise('morning', ex.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  ex.completed
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 text-gray-500'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-[#7C3AED]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  {ex.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
                  )}
                  <div>
                    <p className={`text-xs font-semibold ${ex.completed ? 'line-through text-gray-400' : ''}`}>
                      {ex.name}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{ex.instructions}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 shrink-0">{ex.targetDurationMinutes} mins</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evening Relaxing Stretches (10-15m) */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
                  Evening Posture & Wind Down
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">10–15 mins before sleep</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#7C3AED] dark:text-[#C4B5FD]">
              {eveningDone}/{eveningExercises.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {eveningExercises.map((ex) => (
              <div
                key={ex.id}
                onClick={() => toggleExercise('evening', ex.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  ex.completed
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 text-gray-500'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:border-[#7C3AED]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  {ex.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
                  )}
                  <div>
                    <p className={`text-xs font-semibold ${ex.completed ? 'line-through text-gray-400' : ''}`}>
                      {ex.name}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{ex.instructions}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 shrink-0">{ex.targetDurationMinutes} mins</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wellness & Health Tips for Busy Mother */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-7 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Daily Wellness Tips for Muna
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/50 dark:border-cyan-800/20 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-xs">
              <Droplets className="w-4 h-4" /> Hydration Goal
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Keep a 1L water bottle beside your laptop during Somali Wealth Academy study sessions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/20 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs">
              <Eye className="w-4 h-4" /> 20-20-20 Rule
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Every 20 minutes of Canva design or video editing, look 20 feet away for 20 seconds to prevent screen fatigue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/20 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
              <Coffee className="w-4 h-4" /> Balanced Fuel
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Opt for wholesome dates, almonds, and warm herbal tea rather than late sugary snacks during study blocks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/20 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <Heart className="w-4 h-4" /> Self-Compassion
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Motherhood is sacred. If a day is overwhelming, do even 5 minutes of gentle stretches and rest with peace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
