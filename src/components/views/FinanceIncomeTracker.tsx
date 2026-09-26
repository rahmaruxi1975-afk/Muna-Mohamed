import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  DollarSign,
  TrendingUp,
  Award,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  CheckCircle2,
  Tag,
  FileText,
} from 'lucide-react';
import { playCelebrationFanfare, playGentleChime } from '../../utils/audio';

export const FinanceIncomeTracker: React.FC = () => {
  const {
    financeData,
    addIncomeRecord,
    deleteIncomeRecord,
    updateMonthlyTarget,
    toggleFinanceAlarm,
  } = useDashboard();

  const [showAddModal, setShowAddModal] = useState(false);
  const [amountInput, setAmountInput] = useState('');
  const [sourceInput, setSourceInput] = useState<string>('Stan Store');
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 10));
  const [notesInput, setNotesInput] = useState('');

  const [editingTarget, setEditingTarget] = useState(false);
  const [targetInput, setTargetInput] = useState(financeData.monthlyTarget.toString());

  const totalEarnings = financeData.records.reduce((acc, r) => acc + r.amount, 0);
  const remaining = Math.max(0, financeData.monthlyTarget - totalEarnings);
  const percentAchieved = Math.min(
    Math.round((totalEarnings / financeData.monthlyTarget) * 100),
    100
  );
  const isGoalReached = totalEarnings >= financeData.monthlyTarget;

  // Source breakdown summary
  const sourceTotals = financeData.records.reduce((acc, r) => {
    acc[r.source] = (acc[r.source] || 0) + r.amount;
    return acc;
  }, {} as Record<string, number>);

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amountInput);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    addIncomeRecord({
      amount: parsedAmount,
      source: sourceInput,
      date: dateInput,
      note: notesInput || 'Digital business earnings',
    });

    setAmountInput('');
    setNotesInput('');
    setShowAddModal(false);
  };

  const handleSaveTarget = () => {
    const val = parseInt(targetInput, 10);
    if (!isNaN(val) && val > 0) {
      updateMonthlyTarget(val);
      playGentleChime();
    }
    setEditingTarget(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#122A1E] via-[#1A3828] to-[#0E1F16] text-white p-6 md:p-8 border border-emerald-500/20 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Monthly Financial Milestone Tracker
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display">
              Target: ${financeData.monthlyTarget} / Month
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Muna's primary financial milestone: generate predictable, passive and active income from Stan Store, Affiliate Marketing, TikTok Shop, and Canva digital templates.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[130px]">
              <span className="text-2xl md:text-3xl font-bold text-emerald-300">${totalEarnings}</span>
              <p className="text-xs text-emerald-100 mt-0.5">Recorded Earnings</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[130px]">
              <span className="text-2xl md:text-3xl font-bold text-[#D4AF37]">${remaining}</span>
              <p className="text-xs text-emerald-100 mt-0.5">Remaining to Goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Celebration State Card */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-display">
                Monthly Target Progress ({percentAchieved}%)
              </h3>
              {isGoalReached && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  <Sparkles className="w-3 h-3" /> $300 Milestone Achieved!
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Target: ${financeData.monthlyTarget} · Recorded: ${totalEarnings}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleFinanceAlarm}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                financeData.alarmSoundEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                  : 'bg-gray-100 dark:bg-white/5 border-transparent text-gray-400'
              }`}
              title="Celebration sound when goal is met"
            >
              {financeData.alarmSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{financeData.alarmSoundEnabled ? 'Milestone Alarm ON' : 'Alarm Muted'}</span>
            </button>

            <button
              onClick={() => playCelebrationFanfare()}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-[#D4AF37] border border-amber-300/40 hover:bg-amber-100 transition-colors"
            >
              Test Celebration
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Record Income
            </button>
          </div>
        </div>

        {/* Large Visual Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isGoalReached
                  ? 'bg-gradient-to-r from-[#D4AF37] via-emerald-500 to-[#7C3AED] animate-pulse'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500'
              }`}
              style={{ width: `${percentAchieved}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>$0</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              ${totalEarnings} of ${financeData.monthlyTarget}
            </span>
            <span>${financeData.monthlyTarget}</span>
          </div>
        </div>

        {/* Breakdown by Income Stream */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {['Stan Store', 'Affiliate Marketing', 'TikTok Shop', 'Canva Templates'].map((stream) => {
            const streamAmount = sourceTotals[stream] || 0;
            return (
              <div
                key={stream}
                className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5"
              >
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 block truncate">
                  {stream}
                </span>
                <span className="text-base font-bold text-gray-900 dark:text-white mt-1 block">
                  ${streamAmount}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Income Records Log Table */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
              Earnings History Log
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              All transactions recorded towards your monthly $300 target.
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-400">
            {financeData.records.length} transactions
          </span>
        </div>

        {financeData.records.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-xs">
            No income entries recorded yet. Click "Record Income" above to log your first sale!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 dark:border-white/5 pb-2">
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Source</th>
                  <th className="py-2.5 px-3 font-semibold">Amount</th>
                  <th className="py-2.5 px-3 font-semibold">Notes</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {financeData.records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {rec.date}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#FAF5FF] dark:bg-[#2A1C47] text-[#7C3AED] dark:text-[#D8B4FE] font-semibold">
                        {rec.source}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                      +${rec.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                      {rec.note}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteIncomeRecord(rec.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Income Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-500" /> Log New Earnings
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Amount Earned ($ USD)
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 45.00"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Income Source
                </label>
                <select
                  value={sourceInput}
                  onChange={(e) => setSourceInput(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden"
                >
                  <option value="Stan Store">Stan Store Digital Products</option>
                  <option value="Affiliate Marketing">Affiliate Marketing Referral</option>
                  <option value="TikTok Shop">TikTok Shop Commission</option>
                  <option value="Canva Templates">Canva Template Bundle</option>
                  <option value="Amazon KDP">Amazon KDP Book Royalty</option>
                  <option value="Etsy">Etsy Digital Download</option>
                  <option value="Other">Other Business Stream</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Notes & Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 sales of Social Media Growth Guide via Stan Store"
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
