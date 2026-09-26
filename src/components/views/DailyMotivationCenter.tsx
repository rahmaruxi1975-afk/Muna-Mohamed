import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { QuoteItem } from '../../types';
import {
  Sparkles,
  Heart,
  Plus,
  Volume2,
  Filter,
  Check,
  Share2,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

export const DailyMotivationCenter: React.FC = () => {
  const { quotes, toggleFavoriteQuote, addCustomAffirmation } = useDashboard();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEnglish, setNewEnglish] = useState('');
  const [newArabic, setNewArabic] = useState('');
  const [newSomali, setNewSomali] = useState('');
  const [newCategory, setNewCategory] = useState<QuoteItem['category']>('Faith');

  const categories = [
    'All',
    'Faith',
    'Financial independence',
    'Motherhood',
    'Discipline',
    'Learning',
    'Business',
    'Self-confidence',
    'Patience',
    'Personal growth',
  ];

  const filteredQuotes = quotes.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesFav = !onlyFavorites || q.isFavorite;
    return matchesCat && matchesFav;
  });

  const handleCreateAffirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnglish.trim()) return;

    addCustomAffirmation({
      english: newEnglish,
      arabic: newArabic || undefined,
      somali: newSomali || undefined,
      category: newCategory,
    });

    setNewEnglish('');
    setNewArabic('');
    setNewSomali('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#2D1B4E] via-[#3E206A] to-[#1E1136] text-white p-6 md:p-8 border border-[#7C3AED]/30 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D8B4FE]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Daily Affirmations & Soul Fuel
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display">
              Learn. Build. Believe. Grow.
            </h2>
            <p className="text-sm text-[#E9D5FF]/90 leading-relaxed">
              Inspirational affirmations in English, Somali, and Arabic honoring Muna's journey as an ambitious businesswoman, devoted mother, and servant of Allah.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => {
                playGentleChime();
              }}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-[#D4AF37]" /> Chime of Peace
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] hover:opacity-90 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Affirmation
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#18122B] p-4 rounded-2xl border border-[#EBE7F5] dark:border-[#281D45]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#7C3AED] text-white font-semibold shadow-xs'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
            onlyFavorites
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-600 dark:text-rose-400'
              : 'border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>Favorites Only</span>
        </button>
      </div>

      {/* Grid of Affirmation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuotes.map((q) => (
          <div
            key={q.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#18122B] border border-[#EBE7F5] dark:border-[#281D45] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#C4B5FD] bg-[#FAF5FF] dark:bg-[#251942] px-2.5 py-1 rounded-full border border-[#D8B4FE]/30">
                  {q.category}
                </span>

                <button
                  onClick={() => toggleFavoriteQuote(q.id)}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  title="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      q.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Arabic if present */}
              {q.arabic && (
                <p className="font-arabic text-right text-base text-[#4C1D95] dark:text-[#D8B4FE] font-bold mb-2 leading-relaxed">
                  {q.arabic}
                </p>
              )}

              {/* English */}
              <p className="text-sm font-semibold text-gray-900 dark:text-white font-serif-display leading-relaxed">
                "{q.english}"
              </p>

              {/* Somali if present */}
              {q.somali && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">
                  {q.somali}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400">
              <span>{q.isCustom ? 'Personal Affirmation' : 'Core Foundation'}</span>
              <span className="text-[#D4AF37] font-serif-display font-medium">Muna's Journey</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Affirmation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#7C3AED]" /> Add Personal Affirmation
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAffirmation} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Affirmation in English *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. I am patient, capable, and blessed with the strength to build my dream business."
                  value={newEnglish}
                  onChange={(e) => setNewEnglish(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Arabic Text / Dua (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً"
                  value={newArabic}
                  onChange={(e) => setNewArabic(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white font-arabic text-right"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Somali Translation / Proverb (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhabar adayg iyo dhiiranaan..."
                  value={newSomali}
                  onChange={(e) => setNewSomali(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as QuoteItem['category'])}
                  className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                >
                  <option value="Faith">Faith</option>
                  <option value="Financial independence">Financial independence</option>
                  <option value="Motherhood">Motherhood</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Learning">Learning</option>
                  <option value="Business">Business</option>
                  <option value="Self-confidence">Self-confidence</option>
                  <option value="Patience">Patience</option>
                  <option value="Personal growth">Personal growth</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold"
                >
                  Save Affirmation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
