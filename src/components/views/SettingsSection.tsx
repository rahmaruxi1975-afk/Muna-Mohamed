import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Settings,
  Sun,
  Moon,
  Globe,
  Bell,
  Volume2,
  Download,
  Upload,
  RotateCcw,
  Clock,
  Shield,
  Check,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

export const SettingsSection: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    financeData,
    toggleFinanceAlarm,
    sleepRoutine,
    updateSleepRoutine,
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
  } = useDashboard();

  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Notification toggles
  const [zoomNotifs, setZoomNotifs] = useState(true);
  const [prayerNotifs, setPrayerNotifs] = useState(true);
  const [studyNotifs, setStudyNotifs] = useState(true);
  const [sleepNotifs, setSleepNotifs] = useState(true);

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importDataJSON(importText);
    if (ok) {
      setImportStatus('success');
      setTimeout(() => {
        setImportStatus('idle');
        setShowImportBox(false);
        setImportText('');
      }, 2000);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] dark:bg-[#251842] text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
            <Settings className="w-3.5 h-3.5" /> Preferences & System Control
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-gray-900 dark:text-white">
            Dashboard Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize language, theme, audio chimes, notifications, bedtime routines, and secure data backups.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance & Language */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
            Display & Language
          </h3>

          {/* Theme Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-[#D4AF37]" />
              ) : (
                <Moon className="w-5 h-5 text-[#7C3AED]" />
              )}
              <div>
                <span className="text-xs font-bold text-gray-900 dark:text-white block">Theme Mode</span>
                <span className="text-[11px] text-gray-400">
                  {theme === 'light' ? 'Day Mode (Soft Light)' : 'Night Mode (Deep Violet)'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#7C3AED] text-gray-800 dark:text-white text-xs font-semibold shadow-xs border border-gray-200 dark:border-transparent"
            >
              Switch to {theme === 'light' ? 'Night' : 'Day'}
            </button>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#7C3AED]" /> Preferred Language
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setLanguage('en');
                  playGentleChime();
                }}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  language === 'en'
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage('so');
                  playGentleChime();
                }}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  language === 'so'
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}
              >
                Af Soomaali
              </button>
              <button
                onClick={() => {
                  setLanguage('ar');
                  playGentleChime();
                }}
                className={`py-2 rounded-xl text-xs font-semibold border font-arabic transition-all ${
                  language === 'ar'
                    ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs'
                    : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Audio Chimes */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
            Notifications & Audio Chimes
          </h3>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-xs">
              <span className="font-medium text-gray-800 dark:text-gray-200">Zoom Class Reminders (4x/wk)</span>
              <button
                onClick={() => setZoomNotifs(!zoomNotifs)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  zoomNotifs ? 'bg-[#7C3AED]' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    zoomNotifs ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-xs">
              <span className="font-medium text-gray-800 dark:text-gray-200">Daily Prayer Time Alerts</span>
              <button
                onClick={() => setPrayerNotifs(!prayerNotifs)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  prayerNotifs ? 'bg-[#7C3AED]' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    prayerNotifs ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-xs">
              <span className="font-medium text-gray-800 dark:text-gray-200">10:00 PM Bedtime Wind-Down Alert</span>
              <button
                onClick={() => setSleepNotifs(!sleepNotifs)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  sleepNotifs ? 'bg-[#7C3AED]' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    sleepNotifs ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-xs">
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200 block">
                  $300 Milestone Celebration Sound
                </span>
                <span className="text-[10px] text-gray-400">Fanfare audio when monthly target is reached</span>
              </div>
              <button
                onClick={toggleFinanceAlarm}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  financeData.alarmSoundEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    financeData.alarmSoundEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Sleep & Wake Schedule */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7C3AED]" /> Sleep Schedule
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-gray-500">Target Bedtime</label>
              <input
                type="time"
                value={sleepRoutine.bedtime}
                onChange={(e) => updateSleepRoutine({ bedtime: e.target.value })}
                className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-500">Screen-Free Goal (Mins)</label>
              <input
                type="number"
                min="0"
                max="120"
                value={sleepRoutine.screenFreeGoalMinutes}
                onChange={(e) => updateSleepRoutine({ screenFreeGoalMinutes: parseInt(e.target.value, 10) || 0 })}
                className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 italic">
            "Targeting 7 hours of restorative sleep to keep Muna clear-headed and energized."
          </p>
        </div>

        {/* Backup, Restore & Reset */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D4AF37]" /> Data Security & Backup
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            All your notes, income records, prayers, and course progress are securely saved locally. You can export a JSON backup at any time.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={exportDataJSON}
              className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON Backup
            </button>
            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" /> Restore JSON
            </button>
          </div>

          {showImportBox && (
            <div className="p-3 bg-[#FAF5FF] dark:bg-[#201538] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E] space-y-2">
              <textarea
                rows={3}
                placeholder="Paste backup JSON string here..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full p-2 bg-white dark:bg-[#150D26] rounded-xl border border-gray-200 dark:border-white/10 text-[10px] text-gray-800 dark:text-gray-200"
              />
              <div className="flex justify-between items-center">
                {importStatus === 'success' && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Restored!
                  </span>
                )}
                {importStatus === 'error' && (
                  <span className="text-xs font-bold text-rose-500">Invalid JSON data</span>
                )}
                <button
                  onClick={handleImport}
                  className="ml-auto px-3 py-1.5 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold"
                >
                  Apply Restore
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100 dark:border-white/5">
            <button
              onClick={resetToDefaults}
              className="text-xs text-rose-500 hover:text-rose-600 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset to Somali Wealth Academy Default State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
