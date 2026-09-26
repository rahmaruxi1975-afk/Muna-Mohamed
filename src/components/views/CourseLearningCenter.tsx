import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { CourseModule } from '../../types';
import {
  GraduationCap,
  CheckCircle,
  Circle,
  Search,
  Filter,
  BookOpen,
  Calendar,
  ExternalLink,
  MessageSquare,
  Edit3,
  Sparkles,
  Flame,
  Award,
  Video,
  Save,
  Check,
} from 'lucide-react';

export const CourseLearningCenter: React.FC = () => {
  const { modules, toggleModuleComplete, updateModule, zoomClasses } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(modules[0]);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');
  const [tempQuestions, setTempQuestions] = useState('');
  const [tempRevisionDate, setTempRevisionDate] = useState('');
  const [activeTab, setActiveTab] = useState<'modules' | 'roadmap' | 'zoom'>('modules');

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  const categories = ['All', 'Foundation', 'Marketing', 'Ecommerce & Platforms', 'Digital Products', 'Advanced & Growth'];

  const filteredModules = modules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectModule = (mod: CourseModule) => {
    setSelectedModule(mod);
    setTempNotes(mod.notes);
    setTempQuestions(mod.instructorQuestions);
    setTempRevisionDate(mod.revisionDate);
    setIsEditingNotes(false);
  };

  const handleSaveModuleEdits = () => {
    if (!selectedModule) return;
    updateModule(selectedModule.id, {
      notes: tempNotes,
      instructorQuestions: tempQuestions,
      revisionDate: tempRevisionDate,
    });
    setSelectedModule({
      ...selectedModule,
      notes: tempNotes,
      instructorQuestions: tempQuestions,
      revisionDate: tempRevisionDate,
    });
    setIsEditingNotes(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FF] dark:bg-[#2B1B47] text-[#7C3AED] dark:text-[#D8B4FE] text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Somali Wealth Academy Student Portal</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-gray-900 dark:text-white">
              Digital Marketing & Online Business Education
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
              26 comprehensive modules tailored to turn Muna Mohamed from beginner to confident digital marketer, affiliate seller, and online entrepreneur.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="p-4 bg-[#FAF5FF] dark:bg-[#21153A] border border-[#E9D5FF] dark:border-[#3B2566] rounded-2xl text-center min-w-[120px]">
              <span className="text-2xl md:text-3xl font-bold text-[#7C3AED] dark:text-[#D8B4FE]">
                {progressPercent}%
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                {completedCount} of 26 Done
              </p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-[#D4AF37]">
                <Flame className="w-6 h-6" /> 18
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                Study Streak Days
              </p>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#D4AF37] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Secondary View Tabs */}
        <div className="flex gap-2 mt-6 border-b border-gray-100 dark:border-white/5 pb-2">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'modules'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            All 26 Modules & Notes
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            Entrepreneur Learning Roadmap
          </button>
          <button
            onClick={() => setActiveTab('zoom')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'zoom'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Zoom Class Schedule (4x / week)
          </button>
        </div>
      </div>

      {activeTab === 'roadmap' && (
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] space-y-6">
          <div className="border-b border-gray-100 dark:border-white/10 pb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-display">
              Muna's Entrepreneurial Growth Roadmap
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Visual path from beginner foundations to full-scale digital entrepreneurship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Phase 1 */}
            <div className="p-5 rounded-2xl bg-[#FAF5FF] dark:bg-[#201538] border border-[#E9D5FF] dark:border-[#38235E] space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#7C3AED] text-white">
                Stage 1
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Mindset & Foundations</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Modules 1, 18. Developing unwavering confidence, discipline, and personal mobility.
              </p>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Foundations Set
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-5 rounded-2xl bg-[#FAF5FF] dark:bg-[#201538] border border-[#E9D5FF] dark:border-[#38235E] space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#7C3AED] text-white">
                Stage 2
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Marketing & Creation</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Modules 2, 3, 4, 5, 8, 14, 19, 20, 22. Canva design mastery, viral hooks, AI tools, and TikTok Shop.
              </p>
              <div className="text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
                In Progress (Active Phase)
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-5 rounded-2xl bg-[#FAF5FF] dark:bg-[#201538] border border-[#E9D5FF] dark:border-[#38235E] space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#7C3AED] text-white">
                Stage 3
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Platforms & Products</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Modules 6, 7, 9, 10, 11, 12, 13, 15, 16, 21. Stan Store, Beacons, DFY 300 products, Amazon KDP, Etsy.
              </p>
              <div className="text-xs font-semibold text-gray-400">Up Next</div>
            </div>

            {/* Phase 4 */}
            <div className="p-5 rounded-2xl bg-[#FAF5FF] dark:bg-[#201538] border border-[#E9D5FF] dark:border-[#38235E] space-y-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37] text-white">
                Stage 4
              </span>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Scale & Independence</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Modules 17, 23, 24, 25, 26. Email automation, dispatching, personal branding, and graduation.
              </p>
              <div className="text-xs font-semibold text-gray-400">Target Launch</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'zoom' && (
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-display">
                Weekly Zoom Class Calendar (4 Times Per Week)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Join live instructor sessions, ask questions, and stay accountable.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-[#D4AF37] border border-amber-300/40 rounded-xl">
              100% Attendance Goal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zoomClasses.map((zc) => (
              <div
                key={zc.id}
                className={`p-5 rounded-2xl border transition-all ${
                  zc.attended
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40'
                    : 'bg-white dark:bg-[#201538] border-[#E9D5FF] dark:border-[#38235E]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#7C3AED] text-white">
                      {zc.dayOfWeek}
                    </span>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{zc.time} CST</span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      zc.attended
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {zc.attended ? 'Attended' : 'Upcoming'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{zc.topic}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{zc.instructorNotes}</p>

                <div className="flex items-center gap-3">
                  <a
                    href={zc.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" /> Join Zoom Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'modules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filter & Module List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Search & Category Filter */}
            <div className="bg-white dark:bg-[#18122B] rounded-2xl p-4 border border-[#EBE7F5] dark:border-[#281D45] space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search modules or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#7C3AED] text-white font-semibold'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Modules List */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredModules.map((mod) => {
                const isSelected = selectedModule?.id === mod.id;
                return (
                  <div
                    key={mod.id}
                    onClick={() => handleSelectModule(mod)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FAF5FF] dark:bg-[#251842] border-[#7C3AED] shadow-sm'
                        : 'bg-white dark:bg-[#18122B] border-[#EBE7F5] dark:border-[#281D45] hover:border-[#D8B4FE]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleComplete(mod.id);
                        }}
                        className="shrink-0 p-1 hover:scale-110 transition-transform"
                        title={mod.completed ? 'Mark incomplete' : 'Mark completed'}
                      >
                        {mod.completed ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-[#7C3AED]" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#7C3AED] dark:text-[#C4B5FD]">
                            Mod {mod.number}
                          </span>
                          <span className="text-[10px] text-gray-400">· {mod.category}</span>
                        </div>
                        <p
                          className={`text-xs font-semibold truncate ${
                            mod.completed
                              ? 'text-gray-500 dark:text-gray-400'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {mod.title}
                        </p>
                      </div>
                    </div>

                    {mod.completed && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 shrink-0">
                        Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Module Details & Notes (7 cols) */}
          <div className="lg:col-span-7">
            {selectedModule ? (
              <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] space-y-6">
                {/* Module Title Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#7C3AED] text-white">
                        Module {selectedModule.number}
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {selectedModule.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-serif-display text-gray-900 dark:text-white">
                      {selectedModule.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleModuleComplete(selectedModule.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      selectedModule.completed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md shadow-[#7C3AED]/20'
                    }`}
                  >
                    {selectedModule.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> Completed
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" /> Mark as Completed
                      </>
                    )}
                  </button>
                </div>

                {/* Personal Notes Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-[#7C3AED]" /> Personal Notes & Key Takeaways
                    </span>
                    {!isEditingNotes ? (
                      <button
                        onClick={() => {
                          setTempNotes(selectedModule.notes);
                          setTempQuestions(selectedModule.instructorQuestions);
                          setTempRevisionDate(selectedModule.revisionDate);
                          setIsEditingNotes(true);
                        }}
                        className="text-xs font-semibold text-[#7C3AED] dark:text-[#D8B4FE] hover:underline"
                      >
                        Edit Notes
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveModuleEdits}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </button>
                    )}
                  </div>

                  {isEditingNotes ? (
                    <textarea
                      rows={4}
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="Record what you learned, strategies, key quotes, and next steps..."
                      className="w-full p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-[#7C3AED] text-xs text-gray-900 dark:text-white focus:outline-hidden"
                    />
                  ) : (
                    <div className="p-4 bg-[#FAF5FF] dark:bg-[#201538] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E] text-xs text-gray-700 dark:text-gray-300 leading-relaxed min-h-[70px]">
                      {selectedModule.notes || (
                        <span className="text-gray-400 italic">No notes recorded yet. Tap 'Edit Notes' to add your summary.</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Assignments & Practice Tasks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-2">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      Assignments
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {selectedModule.assignments.length > 0 ? (
                        selectedModule.assignments.map((a, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#7C3AED]">•</span>
                            <span>{a}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">No official assignments listed.</li>
                      )}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-2">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      Practice Tasks
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {selectedModule.practiceTasks.length > 0 ? (
                        selectedModule.practiceTasks.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#D4AF37]">•</span>
                            <span>{t}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">Complete action items from video.</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Instructor Questions & Revision Date */}
                <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-white/10">
                  <div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" /> Questions for Instructor (Zoom Live Session)
                    </span>
                    {isEditingNotes ? (
                      <input
                        type="text"
                        value={tempQuestions}
                        onChange={(e) => setTempQuestions(e.target.value)}
                        placeholder="e.g. How do I optimize payment methods for Somali diaspora buyers?"
                        className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                      />
                    ) : (
                      <p className="text-xs text-gray-600 dark:text-gray-300 bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
                        {selectedModule.instructorQuestions || (
                          <span className="text-gray-400 italic">No pending questions. Add any doubts to ask in Zoom!</span>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>Next Revision Date:</span>
                      {isEditingNotes ? (
                        <input
                          type="date"
                          value={tempRevisionDate}
                          onChange={(e) => setTempRevisionDate(e.target.value)}
                          className="px-2 py-1 rounded bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                        />
                      ) : (
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {selectedModule.revisionDate || 'Not scheduled'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 bg-white dark:bg-[#18122B] rounded-3xl border border-[#EBE7F5] dark:border-[#281D45] text-center text-gray-400 text-xs">
                Select any module from the left list to view notes and assignments.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
