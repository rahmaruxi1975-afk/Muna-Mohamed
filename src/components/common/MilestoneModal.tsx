import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Award, CheckCircle, Sparkles, Volume2, X } from 'lucide-react';
import { playCelebrationFanfare } from '../../utils/audio';

export const MilestoneModal: React.FC = () => {
  const { showMilestoneCelebration, closeMilestoneCelebration, financeData } = useDashboard();

  if (!showMilestoneCelebration) return null;

  const currentTotal = financeData.records.reduce((acc, r) => acc + r.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden bg-white dark:bg-[#18132A] rounded-3xl shadow-2xl border border-[#D8B4FE]/30 dark:border-[#7C3AED]/30 p-6 md:p-8 text-center transform transition-all scale-100">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={closeMilestoneCelebration}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy / Gold Icon */}
        <div className="relative mx-auto w-20 h-20 mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4AF37]/20 to-[#FAF5FF] dark:from-[#D4AF37]/30 dark:to-[#2D1B4E] border border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10">
          <Award className="w-10 h-10 text-[#D4AF37] animate-bounce" />
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#D4AF37]" />
        </div>

        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-[#7C3AED] dark:text-[#C4B5FD] uppercase bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 rounded-full">
          Monthly Target Achieved
        </span>

        <h3 className="text-2xl md:text-3xl font-bold font-serif-display text-gray-900 dark:text-white mb-2">
          Alhamdulillah, Muna!
        </h3>

        <p className="text-lg font-medium text-[#7C3AED] dark:text-[#D8B4FE] mb-4">
          Your ${financeData.monthlyTarget} monthly income goal has been reached!
        </p>

        <div className="bg-[#FAF5FF] dark:bg-[#20173A] border border-[#E9D5FF] dark:border-[#3B2866] rounded-2xl p-4 mb-6 text-left">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Recorded Earnings:</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              ${currentTotal} / ${financeData.monthlyTarget}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D4AF37] to-[#7C3AED] h-2.5 rounded-full"
              style={{ width: '100%' }}
            />
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
            "Keep building your future with consistency. Every small step compounds into barakah and sustainable freedom."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => playCelebrationFanfare()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF5FF] dark:bg-[#2A1E4A] hover:bg-[#F3E8FF] dark:hover:bg-[#382863] text-[#7C3AED] dark:text-[#D8B4FE] border border-[#D8B4FE]/50 text-sm font-medium transition-all"
          >
            <Volume2 className="w-4 h-4" />
            Play Chime Again
          </button>
          <button
            onClick={closeMilestoneCelebration}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#4C1D95] text-white text-sm font-semibold shadow-md shadow-[#7C3AED]/25 transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            Continue Growing
          </button>
        </div>
      </div>
    </div>
  );
};
