import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MilestoneModal } from './components/common/MilestoneModal';

// Views
import { DashboardOverview } from './components/views/DashboardOverview';
import { CourseLearningCenter } from './components/views/CourseLearningCenter';
import { CalendarPlanner } from './components/views/CalendarPlanner';
import { DailyRoutineBuilder } from './components/views/DailyRoutineBuilder';
import { SpiritualWellness } from './components/views/SpiritualWellness';
import { FinanceIncomeTracker } from './components/views/FinanceIncomeTracker';
import { HealthAndExercise } from './components/views/HealthAndExercise';
import { ChildrenLearning } from './components/views/ChildrenLearning';
import { EnglishLearning } from './components/views/EnglishLearning';
import { AICoachChat } from './components/views/AICoachChat';
import { DailyMotivationCenter } from './components/views/DailyMotivationCenter';
import { ProfileSection } from './components/views/ProfileSection';
import { SettingsSection } from './components/views/SettingsSection';

const MainContent: React.FC = () => {
  const { activeTab } = useDashboard();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'course':
        return <CourseLearningCenter />;
      case 'calendar':
        return <CalendarPlanner />;
      case 'daily-planner':
        return <DailyRoutineBuilder />;
      case 'spiritual':
        return <SpiritualWellness />;
      case 'finance':
        return <FinanceIncomeTracker />;
      case 'health':
        return <HealthAndExercise />;
      case 'children':
        return <ChildrenLearning />;
      case 'english':
        return <EnglishLearning />;
      case 'ai-coach':
        return <AICoachChat />;
      case 'motivation':
        return <DailyMotivationCenter />;
      case 'profile':
        return <ProfileSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0E0A1A] text-gray-900 dark:text-gray-100 font-sans transition-colors">
      {/* Sidebar navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="md:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header setMobileOpen={setMobileOpen} />

        {/* View container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>

        {/* Footer info */}
        <footer className="py-4 px-6 border-t border-[#EBE7F5] dark:border-[#241A3D] text-center text-xs text-gray-400">
          <p>MUNA — MY GROWTH JOURNEY · Learn. Build. Believe. Grow. · Somali Wealth Academy</p>
        </footer>
      </div>

      {/* Celebratory Milestone Modal for $300 Income Target */}
      <MilestoneModal />
    </div>
  );
};

export default function App() {
  return (
    <DashboardProvider>
      <MainContent />
    </DashboardProvider>
  );
}
