import React, { useState, useEffect, useRef } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { QURAN_SURAHS, QuranSurahMeta } from '../../data/quranSurahs';
import { FALLBACK_SURAHS } from '../../data/quranFallback';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Sliders,
  Maximize2,
  Minimize2,
  Check,
  Globe,
  Compass,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

export interface AyahItem {
  number: number; // global ayah 1..6236
  numberInSurah: number;
  juz?: number;
  text: string;
  somaliText?: string;
  englishText?: string;
}

interface FetchedSurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: AyahItem[];
}

type TranslationMode = 'both' | 'somali' | 'english' | 'none';
type ArabicFontSize = 'sm' | 'base' | 'lg' | 'xl';

export const QuranReader: React.FC<{ initialSurahNumber?: number; onBackToPlanner?: () => void }> = ({
  initialSurahNumber,
  onBackToPlanner,
}) => {
  const { quranProgress, updateQuranProgress, markQuranReadToday } = useDashboard();

  // Selected Surah
  const [currentSurahNum, setCurrentSurahNum] = useState<number>(() => {
    if (initialSurahNumber && initialSurahNumber >= 1 && initialSurahNumber <= 114) {
      return initialSurahNumber;
    }
    return quranProgress.surahNumber || 1;
  });

  // Surah Data State
  const [surahData, setSurahData] = useState<FetchedSurahData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter
  const [surahSearch, setSurahSearch] = useState<string>('');
  const [ayahFilter, setAyahFilter] = useState<string>('');
  const [isSurahMenuOpen, setIsSurahMenuOpen] = useState<boolean>(false);

  // Display Preferences
  const [translationMode, setTranslationMode] = useState<TranslationMode>('both');
  const [arabicFontSize, setArabicFontSize] = useState<ArabicFontSize>('lg');
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);

  // Audio Player State
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [isContinuousPlay, setIsContinuousPlay] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cache in-memory to prevent repeated fetches
  const cacheRef = useRef<Map<number, FetchedSurahData>>(new Map());

  // Popular Quick Surahs
  const popularSurahs: { num: number; label: string; somaliName: string }[] = [
    { num: 1, label: 'Al-Fatihah', somaliName: 'Furitaanka' },
    { num: 2, label: 'Al-Baqarah', somaliName: 'Lo\'da' },
    { num: 18, label: 'Al-Kahf', somaliName: 'Godka (Jimco)' },
    { num: 36, label: 'Ya-Sin', somaliName: 'Qalbiga Quraanka' },
    { num: 55, label: 'Ar-Rahman', somaliName: 'Naxariistaha' },
    { num: 56, label: 'Al-Waqi\'ah', somaliName: 'Dhacdada (Rizqiga)' },
    { num: 67, label: 'Al-Mulk', somaliName: 'Boqortooyada' },
    { num: 112, label: 'Al-Ikhlas', somaliName: 'Keli-yeelka' },
  ];

  // Font size mapping for font-arabic
  const fontSizeClasses: Record<ArabicFontSize, string> = {
    sm: 'text-xl sm:text-2xl leading-relaxed',
    base: 'text-2xl sm:text-3xl leading-loose',
    lg: 'text-3xl sm:text-4xl leading-[2.4]',
    xl: 'text-4xl sm:text-5xl leading-[2.6]',
  };

  // Fetch Surah text and translations
  useEffect(() => {
    let isCancelled = false;

    const fetchSurah = async (surahNum: number) => {
      // Check cache first
      if (cacheRef.current.has(surahNum)) {
        setSurahData(cacheRef.current.get(surahNum)!);
        setLoading(false);
        setErrorMsg(null);
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,so.abduh,en.sahih`
        );

        if (!response.ok) {
          throw new Error(`Failed to load Surah ${surahNum}`);
        }

        const json = await response.json();
        if (json.code !== 200 || !json.data || json.data.length < 3) {
          throw new Error('Invalid response format from Quran API');
        }

        const arabicEdition = json.data[0];
        const somaliEdition = json.data[1];
        const englishEdition = json.data[2];

        const combinedAyahs: AyahItem[] = arabicEdition.ayahs.map((arAyah: any, idx: number) => {
          const soAyah = somaliEdition.ayahs[idx];
          const enAyah = englishEdition.ayahs[idx];

          let cleanArabic = arAyah.text || '';
          // Remove leading Bismillah in Ayah 1 for surahs other than Al-Fatihah if prefixed
          if (surahNum !== 1 && surahNum !== 9 && idx === 0) {
            cleanArabic = cleanArabic.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '');
          }

          return {
            number: arAyah.number,
            numberInSurah: arAyah.numberInSurah,
            juz: arAyah.juz,
            text: cleanArabic,
            somaliText: soAyah ? soAyah.text : '',
            englishText: enAyah ? enAyah.text : '',
          };
        });

        const fullData: FetchedSurahData = {
          number: arabicEdition.number,
          name: arabicEdition.name,
          englishName: arabicEdition.englishName,
          englishNameTranslation: arabicEdition.englishNameTranslation,
          numberOfAyahs: arabicEdition.numberOfAyahs,
          revelationType: arabicEdition.revelationType,
          ayahs: combinedAyahs,
        };

        if (!isCancelled) {
          cacheRef.current.set(surahNum, fullData);
          setSurahData(fullData);
          setLoading(false);
        }
      } catch (err: any) {
        console.warn('Network Quran fetch failed, attempting fallback:', err);
        // Fallback to local storage or bundled offline surah
        if (FALLBACK_SURAHS[surahNum]) {
          const fallback = FALLBACK_SURAHS[surahNum];
          if (!isCancelled) {
            setSurahData(fallback);
            setLoading(false);
          }
        } else {
          if (!isCancelled) {
            setErrorMsg(
              'Unable to fetch Surah at this moment. Please check your internet connection or choose another Surah.'
            );
            setLoading(false);
          }
        }
      }
    };

    fetchSurah(currentSurahNum);

    // Stop audio on surah change
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingAyahNumber(null);
    }

    return () => {
      isCancelled = true;
    };
  }, [currentSurahNum]);

  // Audio Recitation Management
  const playAyahAudio = (ayahGlobalNumber: number, autoAdvance = false) => {
    if (playingAyahNumber === ayahGlobalNumber && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setPlayingAyahNumber(null);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const player = audioRef.current;

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahGlobalNumber}.mp3`;
    player.src = audioUrl;
    player.play().then(() => {
      setPlayingAyahNumber(ayahGlobalNumber);
    }).catch((err) => {
      console.error('Audio playback error:', err);
      setPlayingAyahNumber(null);
    });

    player.onended = () => {
      if (autoAdvance && surahData) {
        const currentIndex = surahData.ayahs.findIndex((a) => a.number === ayahGlobalNumber);
        if (currentIndex !== -1 && currentIndex < surahData.ayahs.length - 1) {
          const nextAyah = surahData.ayahs[currentIndex + 1];
          playAyahAudio(nextAyah.number, true);
        } else {
          setPlayingAyahNumber(null);
          setIsContinuousPlay(false);
        }
      } else {
        setPlayingAyahNumber(null);
      }
    };
  };

  const toggleContinuousAudio = () => {
    if (!surahData || surahData.ayahs.length === 0) return;
    if (isContinuousPlay) {
      if (audioRef.current) audioRef.current.pause();
      setPlayingAyahNumber(null);
      setIsContinuousPlay(false);
    } else {
      setIsContinuousPlay(true);
      playAyahAudio(surahData.ayahs[0].number, true);
    }
  };

  // Sync Ayah Bookmark to Dashboard Quran Progress
  const handleBookmarkAyah = (ayah: AyahItem) => {
    if (!surahData) return;

    updateQuranProgress({
      surahName: `Surah ${surahData.englishName}`,
      surahNumber: surahData.number,
      ayahProgress: ayah.numberInSurah,
      totalAyahsInSurah: surahData.numberOfAyahs,
    });

    playGentleChime();
    setBookmarkToast(`Bookmarked Ayah ${ayah.numberInSurah} of ${surahData.englishName}`);
    setTimeout(() => setBookmarkToast(null), 3500);
  };

  // Filter Surahs in dropdown
  const filteredSurahs = QURAN_SURAHS.filter(
    (s) =>
      s.englishName.toLowerCase().includes(surahSearch.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(surahSearch.toLowerCase()) ||
      s.name.includes(surahSearch) ||
      s.number.toString() === surahSearch.trim()
  );

  // Filter Ayahs in active Surah
  const displayedAyahs = surahData?.ayahs.filter((a) => {
    if (!ayahFilter.trim()) return true;
    const q = ayahFilter.trim().toLowerCase();
    const matchesNum = a.numberInSurah.toString() === q;
    const matchesArabic = a.text.includes(q);
    const matchesSomali = a.somaliText ? a.somaliText.toLowerCase().includes(q) : false;
    const matchesEnglish = a.englishText ? a.englishText.toLowerCase().includes(q) : false;
    return matchesNum || matchesArabic || matchesSomali || matchesEnglish;
  });

  const isCurrentSurahBookmarked = quranProgress.surahNumber === currentSurahNum;

  return (
    <div className={`space-y-6 animate-fade-in ${focusMode ? 'max-w-4xl mx-auto' : ''}`}>
      {/* Toast Notification */}
      {bookmarkToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <Bookmark className="w-5 h-5 text-amber-200 fill-amber-200" />
          <span className="text-xs font-bold">{bookmarkToast}</span>
        </div>
      )}

      {/* Reader Navigation & Controls Card */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-5">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#D4AF37] flex items-center justify-center text-white shadow-md shadow-[#7C3AED]/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-display">
                  Holy Quran Reader (Mushaf)
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                  Uthmani Script
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Read in pristine Arabic typography with authentic Somali & English translations.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {onBackToPlanner && (
              <button
                onClick={onBackToPlanner}
                className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                Prayers & Schedule
              </button>
            )}

            <button
              onClick={toggleContinuousAudio}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isContinuousPlay
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 animate-pulse'
                  : 'bg-[#FAF5FF] dark:bg-[#2A1B4E] border border-[#E9D5FF] dark:border-[#4C2882] text-[#7C3AED] dark:text-[#C4B5FD] hover:bg-[#F3E8FF]'
              }`}
            >
              {isContinuousPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isContinuousPlay ? 'Pause Recitation' : 'Listen to Surah (Alafasy)'}
            </button>

            <button
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? 'Exit focus mode' : 'Enter focus reading mode'}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-all"
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Surah Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider">
            Quick Jumps:
          </span>
          {popularSurahs.map((ps) => {
            const isSelected = currentSurahNum === ps.num;
            return (
              <button
                key={ps.num}
                onClick={() => setCurrentSurahNum(ps.num)}
                className={`shrink-0 px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white shadow-sm font-bold'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                <span>{ps.label}</span>
                <span className="text-[10px] opacity-75">({ps.somaliName})</span>
              </button>
            );
          })}
        </div>

        {/* Surah Selector & Configuration Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Surah Dropdown Trigger (5 cols) */}
          <div className="relative md:col-span-5">
            <button
              onClick={() => setIsSurahMenuOpen(!isSurahMenuOpen)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-left hover:border-[#7C3AED] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#C4B5FD] flex items-center justify-center text-xs font-bold font-mono">
                  {currentSurahNum}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {surahData?.englishName || `Surah ${currentSurahNum}`}
                    </span>
                    <span className="font-arabic text-base text-[#D4AF37]">
                      {surahData?.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {surahData?.englishNameTranslation} • {surahData?.numberOfAyahs} Ayahs • {surahData?.revelationType}
                  </span>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isSurahMenuOpen ? 'rotate-90' : ''
                }`}
              />
            </button>

            {/* Surah Dropdown Modal / List */}
            {isSurahMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white dark:bg-[#1C1433] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl p-3 space-y-2 max-h-96 overflow-y-auto">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search 114 Surahs by name, number, or meaning..."
                    value={surahSearch}
                    onChange={(e) => setSurahSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.number}
                      onClick={() => {
                        setCurrentSurahNum(surah.number);
                        setIsSurahMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                        currentSurahNum === surah.number
                          ? 'bg-[#FAF5FF] dark:bg-[#2E1A52] text-[#7C3AED] dark:text-[#C4B5FD] font-semibold'
                          : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-white/10 text-center text-[11px] leading-6 font-mono">
                          {surah.number}
                        </span>
                        <div>
                          <p className="text-xs font-semibold">{surah.englishName}</p>
                          <p className="text-[10px] text-gray-400">
                            {surah.englishNameTranslation} • {surah.numberOfAyahs} ayahs
                          </p>
                        </div>
                      </div>
                      <span className="font-arabic text-sm text-[#D4AF37]">{surah.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Surah Prev / Next Nav (2 cols) */}
          <div className="md:col-span-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentSurahNum((prev) => Math.max(1, prev - 1))}
              disabled={currentSurahNum <= 1}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1 text-xs"
              title="Previous Surah"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => setCurrentSurahNum((prev) => Math.min(114, prev + 1))}
              disabled={currentSurahNum >= 114}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1 text-xs"
              title="Next Surah"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Ayah & View Options (5 cols) */}
          <div className="md:col-span-5 flex items-center gap-2 flex-wrap justify-end">
            {/* Translation Mode Selector */}
            <div className="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10 text-xs">
              <button
                onClick={() => setTranslationMode('both')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  translationMode === 'both'
                    ? 'bg-white dark:bg-[#7C3AED] text-gray-900 dark:text-white shadow-sm font-semibold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Somali + EN
              </button>
              <button
                onClick={() => setTranslationMode('somali')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  translationMode === 'somali'
                    ? 'bg-white dark:bg-[#7C3AED] text-gray-900 dark:text-white shadow-sm font-semibold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Somali
              </button>
              <button
                onClick={() => setTranslationMode('english')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  translationMode === 'english'
                    ? 'bg-white dark:bg-[#7C3AED] text-gray-900 dark:text-white shadow-sm font-semibold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setTranslationMode('none')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  translationMode === 'none'
                    ? 'bg-white dark:bg-[#7C3AED] text-gray-900 dark:text-white shadow-sm font-semibold'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Arabic Only
              </button>
            </div>

            {/* Arabic Font Size Adjuster */}
            <div className="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10 text-xs gap-1">
              <span className="text-[10px] px-1.5 font-bold text-gray-400">Font:</span>
              {(['sm', 'base', 'lg', 'xl'] as ArabicFontSize[]).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setArabicFontSize(sz)}
                  className={`w-6 h-6 rounded-lg text-xs uppercase font-bold transition-all ${
                    arabicFontSize === sz
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {sz === 'sm' ? 'S' : sz === 'base' ? 'M' : sz === 'lg' ? 'L' : 'XL'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Bookmark & Reading Status Bar */}
        <div className="p-3 bg-gradient-to-r from-amber-50 to-purple-50 dark:from-amber-950/20 dark:to-purple-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-gray-700 dark:text-gray-300">
              Current Dashboard Bookmark:{' '}
              <strong className="text-[#7C3AED] dark:text-[#C4B5FD] font-bold">
                {quranProgress.surahName} (Ayah {quranProgress.ayahProgress} of {quranProgress.totalAyahsInSurah})
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markQuranReadToday}
              disabled={quranProgress.completedToday}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all ${
                quranProgress.completedToday
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {quranProgress.completedToday ? 'Recitation Completed Today' : 'Mark Daily Reading Done'}
            </button>
          </div>
        </div>
      </div>

      {/* Surah Banner & Bismillah */}
      {surahData && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D1654] via-[#1E1136] to-[#0F081D] text-white p-6 md:p-8 border border-[#7C3AED]/40 shadow-xl text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
              Surah {surahData.number} • {surahData.revelationType} • {surahData.numberOfAyahs} Ayahs
            </span>
            <h2 className="font-arabic text-4xl sm:text-5xl font-bold text-amber-200 tracking-wide">
              {surahData.name}
            </h2>
            <p className="text-base sm:text-lg font-serif-display text-gray-200">
              {surahData.englishName} — {surahData.englishNameTranslation}
            </p>

            {/* Bismillah Header (Except Surah At-Tawbah 9) */}
            {surahData.number !== 9 && (
              <div className="pt-4 border-t border-white/10 mt-4 inline-block">
                <p className="font-arabic text-2xl sm:text-3xl text-amber-300 drop-shadow-sm">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-xs text-gray-300 font-light italic mt-1">
                  Magaca Eebe yaan kubillaabaynaa ee Naxariis guud iyo mid gaaraba Naxariista
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-12 border border-[#EBE7F5] dark:border-[#281D45] text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 border-4 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin mx-auto" />
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">Fetching Holy Quran Text...</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Loading Arabic Uthmani script and Somali translation.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {errorMsg && !loading && (
        <div className="bg-rose-50 dark:bg-rose-950/30 rounded-3xl p-8 border border-rose-200 dark:border-rose-900 text-center space-y-4">
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">{errorMsg}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setCurrentSurahNum(1)}
              className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold"
            >
              Read Surah Al-Fatihah (Offline)
            </button>
            <button
              onClick={() => setCurrentSurahNum((prev) => prev)}
              className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Ayahs List Display */}
      {!loading && surahData && (
        <div className="space-y-4">
          {displayedAyahs && displayedAyahs.length > 0 ? (
            displayedAyahs.map((ayah) => {
              const isPlaying = playingAyahNumber === ayah.number;
              const isBookmarkedAyah =
                isCurrentSurahBookmarked && quranProgress.ayahProgress === ayah.numberInSurah;

              return (
                <div
                  key={ayah.number}
                  id={`ayah-${ayah.numberInSurah}`}
                  className={`bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-7 border transition-all duration-200 space-y-4 ${
                    isPlaying
                      ? 'border-amber-400 dark:border-amber-500/70 shadow-lg shadow-amber-500/10 bg-amber-50/20 dark:bg-amber-950/10'
                      : isBookmarkedAyah
                      ? 'border-[#7C3AED] dark:border-[#9333EA] shadow-md shadow-[#7C3AED]/10 bg-[#FAF5FF]/40 dark:bg-[#25183E]/40'
                      : 'border-[#EBE7F5] dark:border-[#281D45] hover:border-gray-300 dark:hover:border-white/20'
                  }`}
                >
                  {/* Ayah Header Bar: Number, Juz, Actions */}
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#FAF5FF] dark:bg-[#2A1B4E] border border-[#E9D5FF] dark:border-[#4C2882] text-[#7C3AED] dark:text-[#C4B5FD] flex items-center justify-center text-xs font-bold font-mono">
                        {ayah.numberInSurah}
                      </span>
                      {ayah.juz && (
                        <span className="text-[11px] font-medium text-gray-400">
                          Juz {ayah.juz}
                        </span>
                      )}
                      {isBookmarkedAyah && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300">
                          <Bookmark className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Current Bookmark
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Audio Play Button */}
                      <button
                        onClick={() => playAyahAudio(ayah.number)}
                        className={`p-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                          isPlaying
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-[#FAF5FF] hover:text-[#7C3AED]'
                        }`}
                        title={isPlaying ? 'Pause Ayah audio' : 'Listen to Ayah'}
                      >
                        {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{isPlaying ? 'Playing' : 'Listen'}</span>
                      </button>

                      {/* Bookmark Ayah to Dashboard */}
                      <button
                        onClick={() => handleBookmarkAyah(ayah)}
                        className={`p-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                          isBookmarkedAyah
                            ? 'bg-[#7C3AED] text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-[#FAF5FF] hover:text-[#7C3AED]'
                        }`}
                        title="Set as your reading progress bookmark in dashboard"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {isBookmarkedAyah ? 'Bookmarked' : 'Bookmark'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Quranic Arabic Text (Rendered using font-arabic utility class) */}
                  <div className="py-2" dir="rtl">
                    <p
                      className={`font-arabic text-right text-gray-900 dark:text-amber-50 tracking-wide font-normal select-text ${fontSizeClasses[arabicFontSize]}`}
                    >
                      {ayah.text}{' '}
                      <span className="font-arabic text-[#D4AF37] text-xl sm:text-2xl select-none inline-block px-1">
                        ۝{ayah.numberInSurah}
                      </span>
                    </p>
                  </div>

                  {/* Translations Section */}
                  {translationMode !== 'none' && (
                    <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-white/5">
                      {/* Somali Translation */}
                      {(translationMode === 'both' || translationMode === 'somali') && ayah.somaliText && (
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#C4B5FD] flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Somali (Mahmud Abduh):
                          </span>
                          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
                            {ayah.somaliText}
                          </p>
                        </div>
                      )}

                      {/* English Translation */}
                      {(translationMode === 'both' || translationMode === 'english') && ayah.englishText && (
                        <div className="space-y-0.5 pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            English (Saheeh International):
                          </span>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                            "{ayah.englishText}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-[#18122B] rounded-3xl p-8 text-center text-gray-500">
              No ayahs found matching your filter "{ayahFilter}".
            </div>
          )}

          {/* Bottom Pagination / Surah Jump */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white dark:bg-[#18122B] rounded-3xl border border-[#EBE7F5] dark:border-[#281D45]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentSurahNum((prev) => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentSurahNum <= 1}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Surah
              </button>
              <button
                onClick={() => {
                  setCurrentSurahNum((prev) => Math.min(114, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentSurahNum >= 114}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
              >
                Next Surah <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                if (surahData) {
                  updateQuranProgress({
                    surahName: `Surah ${surahData.englishName}`,
                    surahNumber: surahData.number,
                    ayahProgress: surahData.numberOfAyahs,
                    totalAyahsInSurah: surahData.numberOfAyahs,
                  });
                  markQuranReadToday();
                  playGentleChime();
                  setBookmarkToast(`Surah ${surahData.englishName} completed! Barakah in your journey.`);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Finished Reading Surah {surahData.englishName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
