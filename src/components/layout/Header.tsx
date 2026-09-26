import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Bell,
  Menu,
  Globe,
  Sparkles,
  Check,
  Trash2,
  Calendar,
} from 'lucide-react';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
}

const greetings = [
  {
    lang: 'en',
    text: 'Good morning, Muna. Every small step you take today is building the future you dream of.',
    badge: 'Daily Inspiration',
  },
  {
    lang: 'so',
    text: 'Subax wanaagsan Muna. Tallaabo kasta oo aad maanta qaaddo waxay dhisaysaa mustaqbalka aad ku riyoonayso.',
    badge: 'Dhiirigelin',
  },
  {
    lang: 'ar',
    text: 'صباح الخير يا منى. خطواتكِ الصغيرة اليوم تبني مستقبلكِ المشرق بإذن الله.',
    badge: 'تذكير روحي',
  },
];

export const Header: React.FC<HeaderProps> = ({ setMobileOpen }) => {
  const {
    profile,
    language,
    setLanguage,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setActiveTab,
  } = useDashboard();

  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Rotate greeting every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Live date/time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      };
      setCurrentTime(now.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [language]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentGreeting = greetings[greetingIndex];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#130E24]/90 backdrop-blur-md border-b border-[#EBE7F5] dark:border-[#241A3D] px-4 md:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left side: Hamburger & Rotating Motivational Greeting */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                <Sparkles className="w-3 h-3" /> {currentGreeting.badge}
              </span>
              <span className="hidden md:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" /> {currentTime}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 truncate font-serif-display mt-0.5">
              {currentGreeting.text}
            </p>
          </div>
        </div>

        {/* Right side: Language, Notifications, Profile chip */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              title="Change Language"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span className="uppercase">{language}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1A1333] rounded-2xl shadow-xl border border-[#EBE7F5] dark:border-[#2D214F] py-1.5 z-50 animate-fade-in">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left hover:bg-[#FAF5FF] dark:hover:bg-white/5 ${
                    language === 'en' ? 'text-[#7C3AED] font-bold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('so');
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left hover:bg-[#FAF5FF] dark:hover:bg-white/5 ${
                    language === 'so' ? 'text-[#7C3AED] font-bold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>Af Soomaali</span>
                  {language === 'so' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('ar');
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left hover:bg-[#FAF5FF] dark:hover:bg-white/5 ${
                    language === 'ar' ? 'text-[#7C3AED] font-bold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="font-arabic">العربية</span>
                  {language === 'ar' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-[#7C3AED]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37] ring-2 ring-white dark:ring-[#130E24]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1A1333] rounded-2xl shadow-2xl border border-[#EBE7F5] dark:border-[#2D214F] p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#7C3AED] text-white font-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-gray-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-6">
                      No notifications at the moment. All caught up!
                    </p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          notif.read
                            ? 'bg-gray-50 dark:bg-white/5 border-transparent text-gray-500 dark:text-gray-400'
                            : 'bg-[#FAF5FF] dark:bg-[#251A42] border-[#D8B4FE]/50 text-gray-800 dark:text-gray-200 font-medium'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">{notif.title}</span>
                          <span className="text-[10px] text-gray-400">{notif.timestamp}</span>
                        </div>
                        <p className="line-clamp-2 leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Chip */}
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl hover:bg-[#FAF5FF] dark:hover:bg-[#1F1538] border border-transparent hover:border-[#D8B4FE]/40 transition-all text-left"
            title="View Muna's Profile"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#7C3AED]/30 shrink-0 bg-[#7C3AED]/10 flex items-center justify-center">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xs font-bold text-[#7C3AED]">MM</span>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-gray-800 dark:text-white leading-tight">{profile.name}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-[110px]">
                {profile.roles[0]}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
