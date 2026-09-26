import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Moon,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
  MapPin,
  Flame,
  Save,
  Compass,
  BookMarked,
  ArrowRight,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';
import { QuranReader } from '../spiritual/QuranReader';

const islamicVerses = [
  {
    arabic: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    translation: 'And say: "My Lord, increase me in knowledge."',
    somali: 'Waxaad dhahdaa: "Eebbow ii kordhi cilmi."',
    reference: 'Surah Taha (20:114)',
  },
  {
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Indeed, with hardship comes ease.',
    somali: 'Dhab ahaan, dhib kasta waxaa la socda fudayd.',
    reference: 'Surah Ash-Sharh (94:6)',
  },
  {
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    somali: 'I xusuusta aan idin xusuustee, oo ii mahadceliya hana i dafirina.',
    reference: 'Surah Al-Baqarah (2:152)',
  },
  {
    arabic: 'وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
    translation: 'And whoever fears Allah — He will make for him a way out and provide for him from where he does not expect.',
    somali: 'Qofkii Eebe ka baqa wuxuu u yeeli doonaa marin uu kaga baxo dhibka, wuxuuna ka irzaaqi doonaa meel uusan ku xisaabtamin.',
    reference: 'Surah At-Talaq (65:2-3)',
  },
];

const cityPrayerPresets: Record<string, { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string }> = {
  'Minneapolis, MN (CST)': { fajr: '05:15', dhuhr: '13:00', asr: '16:30', maghrib: '19:45', isha: '21:15' },
  'London, UK (GMT)': { fajr: '04:45', dhuhr: '12:55', asr: '16:15', maghrib: '19:30', isha: '21:00' },
  'Mogadishu, Somalia (EAT)': { fajr: '04:40', dhuhr: '11:55', asr: '15:15', maghrib: '18:05', isha: '19:15' },
  'Toronto, Canada (EST)': { fajr: '05:25', dhuhr: '13:10', asr: '16:40', maghrib: '19:50', isha: '21:20' },
  'Nairobi, Kenya (EAT)': { fajr: '05:00', dhuhr: '12:20', asr: '15:35', maghrib: '18:30', isha: '19:40' },
  'Stockholm, Sweden (CET)': { fajr: '04:10', dhuhr: '12:45', asr: '16:05', maghrib: '19:25', isha: '21:10' },
  'Columbus, OH (EST)': { fajr: '05:30', dhuhr: '13:15', asr: '16:45', maghrib: '19:55', isha: '21:25' },
};

export const SpiritualWellness: React.FC = () => {
  const {
    prayers,
    togglePrayer,
    updatePrayerTime,
    quranProgress,
    updateQuranProgress,
    markQuranReadToday,
    profile,
    updateProfile,
  } = useDashboard();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'prayers' | 'quran'>('prayers');
  const [selectedCity, setSelectedCity] = useState(profile.location || 'Minneapolis, MN (CST)');
  const [editingSurah, setEditingSurah] = useState(false);
  const [surahNameInput, setSurahNameInput] = useState(quranProgress.surahName);
  const [ayahInput, setAyahInput] = useState(quranProgress.ayahProgress.toString());
  const [totalAyahsInput, setTotalAyahsInput] = useState(quranProgress.totalAyahsInSurah.toString());
  const [reflectionsInput, setReflectionsInput] = useState(quranProgress.reflections);

  const completedPrayersCount = prayers.filter((p) => p.completed).length;
  const prayerPercentage = Math.round((completedPrayersCount / prayers.length) * 100);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    updateProfile({ location: city });
    const preset = cityPrayerPresets[city];
    if (preset) {
      updatePrayerTime('fajr', preset.fajr);
      updatePrayerTime('dhuhr', preset.dhuhr);
      updatePrayerTime('asr', preset.asr);
      updatePrayerTime('maghrib', preset.maghrib);
      updatePrayerTime('isha', preset.isha);
      playGentleChime();
    }
  };

  const handleSaveQuranProgress = () => {
    const ayahNum = parseInt(ayahInput, 10) || 1;
    const totalAyahNum = parseInt(totalAyahsInput, 10) || 286;
    updateQuranProgress({
      surahName: surahNameInput,
      ayahProgress: ayahNum,
      totalAyahsInSurah: totalAyahNum,
      reflections: reflectionsInput,
    });
    setEditingSurah(false);
    playGentleChime();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Spiritual Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1E1136] via-[#2A174A] to-[#160B29] text-white p-6 md:p-8 border border-[#7C3AED]/30 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D8B4FE]">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Spiritual Wellness & Islamic Peace</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display">
              Bismillah — Heart Centered in Remembrance
            </h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              "Success and barakah in your digital business come through disciplined prayer and continuous connection with the Quran."
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
              <span className="text-2xl md:text-3xl font-bold text-white">{completedPrayersCount}/5</span>
              <p className="text-xs text-gray-300 mt-0.5">Prayers Offered</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-[#D4AF37]">
                <Flame className="w-6 h-6" /> {quranProgress.streakDays}
              </div>
              <p className="text-xs text-amber-300 mt-0.5">Quran Streak Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#18122B] rounded-2xl border border-[#EBE7F5] dark:border-[#281D45] w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('prayers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'prayers'
              ? 'bg-[#FAF5FF] dark:bg-[#2F1C53] text-[#7C3AED] dark:text-[#C4B5FD] shadow-sm border border-[#E9D5FF] dark:border-[#52298F]'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>Prayers & Daily Schedule</span>
        </button>
        <button
          onClick={() => setActiveTab('quran')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quran'
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white shadow-md shadow-[#7C3AED]/20'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Holy Quran Reader (Mushaf)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-300 dark:bg-amber-400 text-purple-950 font-black uppercase tracking-wider">
            Live
          </span>
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === 'quran' ? (
        <QuranReader onBackToPlanner={() => setActiveTab('prayers')} />
      ) : (
        /* Grid: 5 Daily Prayers & Quran Tracker */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5 Daily Prayers (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-7 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <Moon className="w-5 h-5 text-[#7C3AED]" /> Daily Prayer Times
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Configurable by city. Mark each prayer as completed today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) playGentleChime();
                }}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  soundEnabled
                    ? 'bg-[#FAF5FF] dark:bg-[#251842] border-[#D8B4FE] text-[#7C3AED]'
                    : 'bg-gray-100 dark:bg-white/5 border-transparent text-gray-400'
                }`}
                title="Toggle gentle reminder chime"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-[11px]">{soundEnabled ? 'Chime On' : 'Muted'}</span>
              </button>
            </div>
          </div>

          {/* Location Selector */}
          <div className="p-3.5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-[#7C3AED]" /> Location Preset:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1535] border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white focus:outline-hidden"
            >
              {Object.keys(cityPrayerPresets).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Prayer Cards */}
          <div className="space-y-3">
            {prayers.map((prayer) => (
              <div
                key={prayer.id}
                onClick={() => {
                  togglePrayer(prayer.id);
                  if (soundEnabled) playGentleChime();
                }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                  prayer.completed
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300'
                    : 'bg-white dark:bg-[#1C1433] border-[#EBE7F5] dark:border-[#2E204F] hover:border-[#D8B4FE]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-1">
                    {prayer.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-[#7C3AED] shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {prayer.name}
                      </span>
                      <span className="text-xs font-arabic text-[#7C3AED] dark:text-[#C4B5FD]">
                        {prayer.arabicName}
                      </span>
                      <span className="text-[11px] text-gray-400">({prayer.somaliName})</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-400" /> Scheduled Time: {prayer.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={prayer.time}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updatePrayerTime(prayer.id, e.target.value)}
                    className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-800 dark:text-gray-200"
                    title="Edit custom time"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#FAF5FF] dark:bg-[#21153A] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E] flex justify-between items-center text-xs">
            <span className="text-gray-700 dark:text-gray-300">
              Daily Spiritual Consistency: <strong className="text-[#7C3AED] dark:text-[#D8B4FE]">{prayerPercentage}%</strong>
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              All 5 prayers recorded with local timestamps
            </span>
          </div>
        </div>

        {/* Right Column: Quran Reading Tracker & Verses (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quran Tracker */}
          <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#7C3AED]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
                  Daily Quran Tracker
                </h3>
              </div>
              {!editingSurah ? (
                <button
                  onClick={() => setEditingSurah(true)}
                  className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline"
                >
                  Edit Goal
                </button>
              ) : (
                <button
                  onClick={handleSaveQuranProgress}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <Save className="w-3.5 h-3.5" /> Save
                </button>
              )}
            </div>

            {editingSurah ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-gray-500">Current Surah</label>
                  <input
                    type="text"
                    value={surahNameInput}
                    onChange={(e) => setSurahNameInput(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500">Ayah Progress</label>
                    <input
                      type="number"
                      value={ayahInput}
                      onChange={(e) => setAyahInput(e.target.value)}
                      className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500">Total Ayahs in Surah</label>
                    <input
                      type="number"
                      value={totalAyahsInput}
                      onChange={(e) => setTotalAyahsInput(e.target.value)}
                      className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500">Daily Reflections</label>
                  <textarea
                    rows={2}
                    value={reflectionsInput}
                    onChange={(e) => setReflectionsInput(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {quranProgress.surahName}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ayah {quranProgress.ayahProgress} of {quranProgress.totalAyahsInSurah}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF5FF] dark:bg-[#271A42] text-[#7C3AED] dark:text-[#C4B5FD] border border-[#D8B4FE]/40">
                    Goal: {quranProgress.dailyGoalPages} Pages/Day
                  </span>
                </div>

                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((quranProgress.ayahProgress / quranProgress.totalAyahsInSurah) * 100)
                      )}%`,
                    }}
                  />
                </div>

                <div className="p-4 bg-[#FAF5FF] dark:bg-[#201538] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#C4B5FD]">
                    Personal Reflection
                  </span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{quranProgress.reflections}"
                  </p>
                </div>

                <button
                  onClick={markQuranReadToday}
                  disabled={quranProgress.completedToday}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    quranProgress.completedToday
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white shadow-md shadow-[#7C3AED]/20'
                  }`}
                >
                  {quranProgress.completedToday ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Recited Today (Streak: {quranProgress.streakDays} Days)
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" /> Complete Today's Reading
                    </>
                  )}
                </button>

                {/* Direct button to open the full interactive Quran Reader */}
                <button
                  onClick={() => setActiveTab('quran')}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#7C3AED]/30 bg-[#FAF5FF] dark:bg-[#281846] text-[#7C3AED] dark:text-[#C4B5FD] hover:bg-[#F3E8FF] dark:hover:bg-[#341F5E] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <BookMarked className="w-4 h-4 text-[#D4AF37]" />
                  <span>Open Interactive Quran Reader (Mushaf)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Rotating Collection of Inspirational Islamic Verses */}
          <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Quranic Verses & Duas for Peace & Provision
              </h4>
            </div>

            <div className="space-y-4">
              {islamicVerses.map((v, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/15 border border-amber-200/50 dark:border-amber-800/20 space-y-2"
                >
                  <p className="text-base font-arabic font-bold text-right text-gray-900 dark:text-amber-100 leading-relaxed">
                    {v.arabic}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">"{v.translation}"</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">{v.somali}</p>
                  <span className="text-[10px] font-semibold text-[#D4AF37] block text-right">
                    — {v.reference}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
