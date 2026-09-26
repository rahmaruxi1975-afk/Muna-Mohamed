import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { CalendarEvent } from '../../types';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Trash2,
  Filter,
  CheckCircle2,
  Video,
  BookOpen,
  Users,
  Moon,
  Sparkles,
} from 'lucide-react';

export const CalendarPlanner: React.FC = () => {
  const { calendarEvents, addCalendarEvent, deleteCalendarEvent } = useDashboard();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 10));
  const [startTimeInput, setStartTimeInput] = useState('14:00');
  const [endTimeInput, setEndTimeInput] = useState('15:00');
  const [catInput, setCatInput] = useState<CalendarEvent['category']>('zoom');
  const [descInput, setDescInput] = useState('');

  const categories = [
    { id: 'All', label: 'All Events', color: 'bg-gray-500' },
    { id: 'zoom', label: 'Academy & Zoom', color: 'bg-[#7C3AED]' },
    { id: 'study', label: 'Self Study & Canva', color: 'bg-indigo-500' },
    { id: 'children', label: "Children's Homework", color: 'bg-blue-500' },
    { id: 'business', label: 'Business & Store', color: 'bg-amber-500' },
    { id: 'prayer', label: 'Prayer & Spiritual', color: 'bg-emerald-500' },
    { id: 'exercise', label: 'Exercise & Health', color: 'bg-rose-500' },
  ];

  const filteredEvents = calendarEvents.filter((e) => {
    return selectedCategory === 'All' || e.category === selectedCategory;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    addCalendarEvent({
      title: titleInput,
      date: dateInput,
      startTime: startTimeInput,
      endTime: endTimeInput,
      category: catInput,
      description: descInput,
    });

    setTitleInput('');
    setDescInput('');
    setShowAddModal(false);
  };

  const getCategoryBadge = (cat: CalendarEvent['category']) => {
    switch (cat) {
      case 'zoom':
        return 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300';
      case 'study':
        return 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-300';
      case 'children':
        return 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300';
      case 'business':
        return 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300';
      case 'prayer':
      case 'quran':
        return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300';
      case 'exercise':
        return 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] dark:bg-[#251842] text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
              <CalendarIcon className="w-3.5 h-3.5" /> Structured Life Calendar
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-gray-900 dark:text-white">
              Integrated Calendar & Event Planner
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Color-coded harmony between Somali Wealth Academy Zoom calls, children's school reviews, prayer times, and personal study.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode Switcher */}
            <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 text-xs">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                    viewMode === mode
                      ? 'bg-white dark:bg-[#7C3AED] text-gray-900 dark:text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pt-6 border-t border-gray-100 dark:border-white/5 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#7C3AED] text-white font-semibold shadow-xs'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar View Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Events Grid (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
              Upcoming Schedule ({viewMode.toUpperCase()} VIEW)
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              {filteredEvents.length} events listed
            </span>
          </div>

          <div className="space-y-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-[#D8B4FE] dark:hover:border-[#7C3AED] bg-gray-50/50 dark:bg-white/5 transition-all flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#1F1538] border border-gray-200 dark:border-white/10 text-center shrink-0 min-w-[65px]">
                    <span className="text-[11px] font-bold text-[#7C3AED] dark:text-[#C4B5FD] block">
                      {ev.startTime}
                    </span>
                    <span className="text-[9px] text-gray-400 block">{ev.endTime}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadge(ev.category)}`}>
                        {ev.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{ev.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{ev.title}</h4>
                    {ev.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ev.description}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteCalendarEvent(ev.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Remove event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Day Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-white/10">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Daily Priority Highlights
            </h4>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/20">
                <span className="text-[10px] font-bold text-[#7C3AED] uppercase block">
                  Somali Wealth Academy
                </span>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                  Zoom Live Coaching & Q&A
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">19:00 CST (4 sessions/week)</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/20">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">
                  Children's Study Block
                </span>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                  Ayaan & Zakariya Homework Review
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">16:30 - 18:00 CST</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/20">
                <span className="text-[10px] font-bold text-emerald-600 uppercase block">
                  Spiritual Discipline
                </span>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                  5 Daily Prayers & Quran Goal
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">4 Pages & Surah Reflections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Calendar Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#7C3AED]" /> Create Calendar Event
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Canva Template Design Session"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Date</label>
                  <input
                    type="date"
                    required
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Start Time</label>
                  <input
                    type="time"
                    required
                    value={startTimeInput}
                    onChange={(e) => setStartTimeInput(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">End Time</label>
                  <input
                    type="time"
                    required
                    value={endTimeInput}
                    onChange={(e) => setEndTimeInput(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    value={catInput}
                    onChange={(e) => setCatInput(e.target.value as CalendarEvent['category'])}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  >
                    <option value="zoom">Academy & Zoom</option>
                    <option value="study">Self Study & Canva</option>
                    <option value="children">Children's Homework</option>
                    <option value="business">Business & Store</option>
                    <option value="prayer">Prayer & Spiritual</option>
                    <option value="exercise">Exercise & Health</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Notes</label>
                <input
                  type="text"
                  placeholder="Optional details..."
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
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
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
