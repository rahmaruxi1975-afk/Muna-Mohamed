import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { NavTab } from '../../types';
import {
  LayoutDashboard,
  GraduationCap,
  Calendar as CalendarIcon,
  ListTodo,
  Moon,
  DollarSign,
  Activity,
  BookOpen,
  Languages,
  Bot,
  Sparkles,
  User,
  Settings,
  Sun,
  Video,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItemConfig {
  id: NavTab;
  label: string;
  somaliLabel: string;
  arabicLabel: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, theme, toggleTheme, language, modules, zoomClasses, englishState } = useDashboard();

  const completedCount = modules.filter((m) => m.completed).length;
  const coursePercent = Math.round((completedCount / modules.length) * 100);

  const navItems: NavItemConfig[] = [
    { id: 'dashboard', label: 'Dashboard', somaliLabel: 'Guudmar', arabicLabel: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'course', label: 'My Course', somaliLabel: 'Koorsadeyda', arabicLabel: 'دورتي التعليمية', icon: GraduationCap, badge: `${coursePercent}%` },
    { id: 'calendar', label: 'Calendar', somaliLabel: 'Kalandarka', arabicLabel: 'التقويم', icon: CalendarIcon },
    { id: 'daily-planner', label: 'Daily Planner', somaliLabel: 'Qorshaha Maalinta', arabicLabel: 'المخطط اليومي', icon: ListTodo },
    { id: 'english', label: 'English Learning', somaliLabel: 'Barashada Ingiriisiga', arabicLabel: 'تعلم الإنجليزية', icon: Languages, badge: `${englishState?.streakDays || 5}d` },
    { id: 'spiritual', label: 'Spiritual Wellness', somaliLabel: 'Daryeelka Ruuxiga', arabicLabel: 'العناية الروحية', icon: Moon },
    { id: 'finance', label: 'Finance', somaliLabel: 'Maaliyadda ($300)', arabicLabel: 'الأهداف المالية', icon: DollarSign },
    { id: 'health', label: 'Health & Exercise', somaliLabel: 'Jimicsiga & Caafimaadka', arabicLabel: 'الصحة والتمارين', icon: Activity },
    { id: 'children', label: "Children's Learning", somaliLabel: 'Waxbarashada Carruurta', arabicLabel: 'دراسة أطفالي', icon: BookOpen },
    { id: 'ai-coach', label: 'Muna AI Coach', somaliLabel: 'Tababaraha AI', arabicLabel: 'المدرب الذكي', icon: Bot, badge: 'AI' },
    { id: 'motivation', label: 'Motivation', somaliLabel: 'Dhiirigelinta', arabicLabel: 'مركز التحفيز', icon: Sparkles },
    { id: 'profile', label: 'Profile', somaliLabel: 'Muuqaalka', arabicLabel: 'الملف الشخصي', icon: User },
    { id: 'settings', label: 'Settings', somaliLabel: 'Hagaajinta', arabicLabel: 'الإعدادات', icon: Settings },
  ];

  const getLabel = (item: NavItemConfig) => {
    if (language === 'ar') return item.arabicLabel;
    if (language === 'so') return item.somaliLabel;
    return item.label;
  };

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 flex flex-col bg-white dark:bg-[#130E24] border-r border-[#EBE7F5] dark:border-[#241A3D] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 pb-4 border-b border-[#EBE7F5] dark:border-[#241A3D]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#D4AF37] flex items-center justify-center text-white font-serif-display text-xl font-bold shadow-md shadow-[#7C3AED]/20">
                M
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-[#1E1B2E] dark:text-white font-serif-display">
                  MUNA
                </h1>
                <p className="text-[11px] font-semibold tracking-wider text-[#7C3AED] dark:text-[#C4B5FD] uppercase">
                  My Growth Journey
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              title={theme === 'light' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-[#7C3AED]" /> : <Sun className="w-4 h-4 text-[#D4AF37]" />}
            </button>
          </div>

          <p className="mt-2.5 text-xs text-gray-500 dark:text-gray-400 italic">
            "Learn. Build. Believe. Grow."
          </p>

          {/* Quick Academy Badge */}
          <div className="mt-3.5 p-2.5 bg-[#FAF5FF] dark:bg-[#1E1436] rounded-xl border border-[#E9D5FF] dark:border-[#38235E] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-[#4C1D95] dark:text-[#E9D5FF]">Somali Wealth Academy</span>
            </div>
            <span className="text-[11px] font-bold text-[#7C3AED] dark:text-[#D8B4FE]">{completedCount}/26</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/25 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-[#F4EFFF] dark:hover:bg-[#1E1635] hover:text-[#7C3AED] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-[#7C3AED]'
                    }`}
                  />
                  <span>{getLabel(item)}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'AI'
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#7C3AED]/20 text-[#7C3AED] dark:text-[#D8B4FE] border border-[#D4AF37]/40'
                        : 'bg-[#EDE9FE] dark:bg-[#2E1E4E] text-[#6D28D9] dark:text-[#C4B5FD]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Zoom Class Pill at Bottom */}
        <div className="p-3 border-t border-[#EBE7F5] dark:border-[#241A3D]">
          <div
            onClick={() => handleSelectTab('course')}
            className="cursor-pointer p-3 bg-gradient-to-r from-[#FAF5FF] to-[#F3E8FF] dark:from-[#1D1433] dark:to-[#2A1C49] rounded-2xl border border-[#D8B4FE]/40 dark:border-[#4C2882] hover:border-[#7C3AED] transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] dark:text-[#D8B4FE]">
                <Video className="w-3.5 h-3.5" /> Next Live Session
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#7C3AED] text-white font-medium">4x / wk</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
              {zoomClasses[0]?.topic || 'Zoom Class'}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              {zoomClasses[0]?.dayOfWeek} at {zoomClasses[0]?.time}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
