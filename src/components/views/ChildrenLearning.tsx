import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { ChildProfile, ChildSubject, ReviewSession } from '../../types';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Heart,
  Sparkles,
  Calendar,
  AlertCircle,
  Edit2,
  Save,
  Bell,
  BellOff,
  Trash2,
  Check,
  X,
  GraduationCap,
  ChevronRight,
  Star,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

export const ChildrenLearning: React.FC = () => {
  const {
    children,
    toggleSubjectReviewed,
    updateChild,
    addChild,
    deleteChild,
    addSubjectToChild,
    deleteSubjectFromChild,
    updateChildSubject,
    addReviewSession,
    toggleReviewSession,
    deleteReviewSession,
    toggleStudyReminder,
    updateStudyReminder,
    addNotification,
  } = useDashboard();

  const [activeChildId, setActiveChildId] = useState<string>(children[0]?.id || 'c-1');

  // Modals & form state
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<ChildSubject | null>(null);

  // New Child Form
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState<number>(15);
  const [newChildGrade, setNewChildGrade] = useState('');
  const [newChildTime, setNewChildTime] = useState('16:00 - 17:00');
  const [newChildNotes, setNewChildNotes] = useState('');

  // Subject Form
  const [subjectName, setSubjectName] = useState('');
  const [subjectTopic, setSubjectTopic] = useState('');
  const [subjectHomework, setSubjectHomework] = useState('');
  const [subjectDueDate, setSubjectDueDate] = useState('Tomorrow');
  const [subjectNotes, setSubjectNotes] = useState('');

  // Schedule Session Form
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().slice(0, 10));
  const [sessionTime, setSessionTime] = useState('17:00');
  const [sessionGoal, setSessionGoal] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');

  // Reminder Edit
  const [isEditingReminderTime, setIsEditingReminderTime] = useState(false);
  const [tempReminderTime, setTempReminderTime] = useState('17:00');

  // Personal Notes Edit
  const [editingNotes, setEditingNotes] = useState(false);
  const [childNotesInput, setChildNotesInput] = useState('');

  const activeChild = children.find((c) => c.id === activeChildId) || children[0] || null;

  // Visual accents per child
  const getChildAccent = (index: number) => {
    switch (index % 3) {
      case 0:
        return {
          gradient: 'from-indigo-600 to-violet-700',
          bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
          border: 'border-indigo-200 dark:border-indigo-800/40',
          text: 'text-indigo-600 dark:text-indigo-300',
          badge: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
          ring: 'ring-indigo-500',
        };
      case 1:
        return {
          gradient: 'from-purple-600 to-pink-600',
          bgLight: 'bg-purple-50 dark:bg-purple-950/40',
          border: 'border-purple-200 dark:border-purple-800/40',
          text: 'text-purple-600 dark:text-purple-300',
          badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
          ring: 'ring-purple-500',
        };
      case 2:
      default:
        return {
          gradient: 'from-teal-600 to-emerald-600',
          bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-200 dark:border-emerald-800/40',
          text: 'text-emerald-600 dark:text-emerald-300',
          badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
          ring: 'ring-emerald-500',
        };
    }
  };

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    addChild({
      name: newChildName.trim(),
      age: newChildAge || 15,
      gradeLevel: newChildGrade || 'High School',
      gradeOrAge: `${newChildAge} yrs · ${newChildGrade || 'Student'}`,
      dailyReviewTime: newChildTime || '16:30 - 17:30',
      studyReminderEnabled: true,
      studyReminderTime: newChildTime.split(' - ')[0] || '16:30',
      studyNotes: newChildNotes.trim() || 'Encourage consistent daily effort and praise good character.',
      subjects: [
        {
          id: `sub-${Date.now()}-1`,
          name: 'Mathematics',
          currentTopic: 'Core Curriculum',
          homeworkDue: 'Daily practice problem set',
          dueDate: 'Tomorrow',
          reviewedToday: false,
          difficultTopicsNotes: 'Practice key formulas together',
        },
        {
          id: `sub-${Date.now()}-2`,
          name: 'Science & Lab',
          currentTopic: 'Chapter Overview',
          homeworkDue: 'Reading & comprehension review',
          dueDate: 'Thursday',
          reviewedToday: false,
          difficultTopicsNotes: 'Summarize key terms',
        },
        {
          id: `sub-${Date.now()}-3`,
          name: 'Islamic Studies & Quran',
          currentTopic: 'Surah Memorization & Reflection',
          homeworkDue: 'Daily Tajweed practice',
          dueDate: 'Friday',
          reviewedToday: true,
          difficultTopicsNotes: 'Encourage sincere recitation',
        },
      ],
      reviewSessions: [
        {
          id: `rev-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          time: '17:00',
          topicOrGoal: 'Daily homework check & lesson review',
          completed: false,
          notes: 'Review before evening prayer',
        },
      ],
    });

    setNewChildName('');
    setNewChildGrade('');
    setNewChildAge(15);
    setNewChildNotes('');
    setShowAddChildModal(false);
  };

  const handleSaveNotes = () => {
    if (!activeChild) return;
    updateChild(activeChild.id, { studyNotes: childNotesInput });
    setEditingNotes(false);
    playGentleChime();
  };

  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild || !subjectName.trim()) return;

    if (editingSubject) {
      updateChildSubject(activeChild.id, editingSubject.id, {
        name: subjectName.trim(),
        currentTopic: subjectTopic.trim(),
        homeworkDue: subjectHomework.trim(),
        dueDate: subjectDueDate.trim(),
        difficultTopicsNotes: subjectNotes.trim(),
      });
    } else {
      addSubjectToChild(activeChild.id, {
        name: subjectName.trim(),
        currentTopic: subjectTopic.trim() || 'Core concepts',
        homeworkDue: subjectHomework.trim() || 'Review chapter notes',
        dueDate: subjectDueDate.trim() || 'Tomorrow',
        reviewedToday: false,
        difficultTopicsNotes: subjectNotes.trim(),
      });
    }

    setSubjectName('');
    setSubjectTopic('');
    setSubjectHomework('');
    setSubjectDueDate('Tomorrow');
    setSubjectNotes('');
    setEditingSubject(null);
    setShowAddSubjectModal(false);
  };

  const openEditSubjectModal = (sub: ChildSubject) => {
    setEditingSubject(sub);
    setSubjectName(sub.name);
    setSubjectTopic(sub.currentTopic);
    setSubjectHomework(sub.homeworkDue);
    setSubjectDueDate(sub.dueDate || 'Tomorrow');
    setSubjectNotes(sub.difficultTopicsNotes);
    setShowAddSubjectModal(true);
  };

  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild || !sessionGoal.trim()) return;

    addReviewSession(activeChild.id, {
      date: sessionDate,
      time: sessionTime,
      topicOrGoal: sessionGoal.trim(),
      completed: false,
      notes: sessionNotes.trim(),
    });

    addNotification(
      `Homework Session Scheduled: ${activeChild.name}`,
      `Review session scheduled for ${sessionDate} at ${sessionTime} (${sessionGoal}).`,
      'study'
    );

    setSessionGoal('');
    setSessionNotes('');
    setShowScheduleModal(false);
  };

  const handleSaveReminderTime = () => {
    if (!activeChild) return;
    updateStudyReminder(activeChild.id, tempReminderTime, true);
    setIsEditingReminderTime(false);
    playGentleChime();
    addNotification(
      `Study Reminder Updated: ${activeChild.name}`,
      `Daily study reminder set to ${tempReminderTime}.`,
      'study'
    );
  };

  const markAllReviewed = () => {
    if (!activeChild) return;
    const updatedSubjects = activeChild.subjects.map((s) => ({ ...s, reviewedToday: true }));
    updateChild(activeChild.id, { subjects: updatedSubjects });
    playGentleChime();
  };

  const resetDailyReviews = () => {
    if (!activeChild) return;
    const updatedSubjects = activeChild.subjects.map((s) => ({ ...s, reviewedToday: false }));
    updateChild(activeChild.id, { subjects: updatedSubjects });
    playGentleChime();
  };

  const completedCount = activeChild ? activeChild.subjects.filter((s) => s.reviewedToday).length : 0;
  const totalSubjects = activeChild ? activeChild.subjects.length : 0;
  const progressPercent = totalSubjects > 0 ? Math.round((completedCount / totalSubjects) * 100) : 0;

  return (
    <div className="space-y-7 animate-fade-in pb-12">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1E1136] via-[#2A164D] to-[#160B29] text-white p-6 md:p-8 border border-[#7C3AED]/25 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E9D5FF] backdrop-blur-xs border border-white/10">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              Family Education & Homework Hub
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display tracking-tight text-white">
              My Children's Learning Time
            </h2>
            <p className="text-xs md:text-sm text-purple-100/80 leading-relaxed">
              Nurturing <strong>Cabdiraxman</strong> (18, Grade 11), <strong>Raxma</strong> (16, Grade 10), and{' '}
              <strong>Cabdirashiid</strong> (14, Grade 9). Schedule personalized homework review sessions, track school subjects, set daily study reminders, and record personal guidance notes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddChildModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" /> Add Child Profile
            </button>
          </div>
        </div>
      </div>

      {/* Children Separate Profile Cards (1. Cabdiraxman, 2. Raxma, 3. Cabdirashiid) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#7C3AED]" /> Children's Profiles
          </h3>
          <span className="text-[11px] text-gray-400">
            Click any profile card to manage review sessions & subjects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {children.map((child, idx) => {
            const isSelected = child.id === activeChild?.id;
            const accent = getChildAccent(idx);
            const reviewed = child.subjects.filter((s) => s.reviewedToday).length;
            const total = child.subjects.length;
            const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0;

            return (
              <div
                key={child.id}
                onClick={() => {
                  setActiveChildId(child.id);
                  setChildNotesInput(child.studyNotes);
                  setTempReminderTime(child.studyReminderTime || '17:00');
                  setEditingNotes(false);
                  setIsEditingReminderTime(false);
                }}
                className={`relative rounded-3xl p-5 md:p-6 transition-all duration-200 cursor-pointer border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-[#1C1333] border-[#7C3AED] dark:border-[#9061F9] shadow-lg ring-2 ring-[#7C3AED]/30 dark:ring-[#9061F9]/30'
                    : 'bg-white/80 dark:bg-[#160E29]/80 hover:bg-white dark:hover:bg-[#1C1333] border-gray-200 dark:border-white/10 shadow-xs hover:border-[#7C3AED]/50'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7C3AED] text-white shadow-xs">
                    <Check className="w-3 h-3" /> Active View
                  </span>
                )}

                <div>
                  {/* Avatar & Header */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0`}
                    >
                      {child.name.charAt(0)}
                    </div>
                    <div className="min-w-0 pr-12">
                      <h4 className="text-base font-bold text-gray-900 dark:text-white truncate font-serif-display">
                        {child.name}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                        <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200">
                          {child.age ? `${child.age} yrs old` : child.gradeOrAge}
                        </span>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold ${accent.badge}`}
                        >
                          {child.gradeLevel || child.gradeOrAge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Daily Study Window & Reminder */}
                  <div className="space-y-2 py-2 border-t border-gray-100 dark:border-white/5 text-xs">
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-[#7C3AED]" /> Study Block:
                      </span>
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        {child.dailyReviewTime}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        {child.studyReminderEnabled ? (
                          <Bell className="w-3.5 h-3.5 text-amber-500" />
                        ) : (
                          <BellOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                        Reminder:
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          child.studyReminderEnabled
                            ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-500'
                        }`}
                      >
                        {child.studyReminderEnabled ? `At ${child.studyReminderTime || '16:30'}` : 'Off'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-3 border-t border-gray-100 dark:border-white/5 mt-2">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Daily Lessons Reviewed</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {reviewed}/{total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${accent.gradient}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Child Management Workspace */}
      {activeChild && (
        <div className="space-y-6">
          {/* Quick Action & Controls Bar for Active Child */}
          <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 md:p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#C4B5FD] font-bold text-xl flex items-center justify-center font-serif-display shrink-0">
                {activeChild.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif-display">
                    {activeChild.name}’s Workspace
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#C4B5FD]">
                    {activeChild.age ? `${activeChild.age} years old` : ''} · {activeChild.gradeLevel || activeChild.gradeOrAge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Daily review window: <strong className="text-gray-800 dark:text-gray-200">{activeChild.dailyReviewTime}</strong>
                </p>
              </div>
            </div>

            {/* Individual Reminder Controls & Quick Toggles */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Reminder toggle */}
              <button
                onClick={() => toggleStudyReminder(activeChild.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                  activeChild.studyReminderEnabled
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40 shadow-xs'
                    : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:bg-gray-100'
                }`}
                title="Toggle Study Reminder"
              >
                {activeChild.studyReminderEnabled ? (
                  <>
                    <Bell className="w-3.5 h-3.5 text-amber-500" />
                    Reminder On ({activeChild.studyReminderTime || '16:30'})
                  </>
                ) : (
                  <>
                    <BellOff className="w-3.5 h-3.5 text-gray-400" />
                    Reminder Off
                  </>
                )}
              </button>

              {/* Edit Reminder Time Button */}
              {!isEditingReminderTime ? (
                <button
                  onClick={() => {
                    setTempReminderTime(activeChild.studyReminderTime || '17:00');
                    setIsEditingReminderTime(true);
                  }}
                  className="p-2 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                  title="Change reminder time"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/10 p-1 rounded-xl border border-gray-200 dark:border-white/10">
                  <input
                    type="time"
                    value={tempReminderTime}
                    onChange={(e) => setTempReminderTime(e.target.value)}
                    className="p-1 text-xs rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSaveReminderTime}
                    className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                    title="Save reminder time"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsEditingReminderTime(false)}
                    className="p-1 rounded text-gray-400 hover:text-gray-600"
                    title="Cancel"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Mark All Reviewed / Reset */}
              {completedCount < totalSubjects ? (
                <button
                  onClick={markAllReviewed}
                  className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Mark All Reviewed
                </button>
              ) : (
                <button
                  onClick={resetDailyReviews}
                  className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-200 transition-all"
                >
                  Reset Daily Review
                </button>
              )}
            </div>
          </div>

          {/* Grid Layout: Left Column (Subjects & Homework) / Right Column (Sessions & Personal Notes) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. Subjects & Assignments Tracker (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#7C3AED]" />
                    School Subjects & Homework Tracker
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Click checkmark on any lesson to mark reviewed.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingSubject(null);
                    setSubjectName('');
                    setSubjectTopic('');
                    setSubjectHomework('');
                    setSubjectDueDate('Tomorrow');
                    setSubjectNotes('');
                    setShowAddSubjectModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Subject
                </button>
              </div>

              {/* Subjects List */}
              <div className="space-y-3.5">
                {activeChild.subjects.map((sub) => (
                  <div
                    key={sub.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      sub.reviewedToday
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-gray-50/70 dark:bg-white/5 border-gray-100 dark:border-white/5 hover:border-[#7C3AED]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Checkmark Button */}
                      <button
                        onClick={() => toggleSubjectReviewed(activeChild.id, sub.id)}
                        className="mt-0.5 shrink-0 focus:outline-hidden"
                        title={sub.reviewedToday ? 'Mark pending' : 'Mark as reviewed'}
                      >
                        {sub.reviewedToday ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 hover:opacity-80 transition-opacity" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-[#7C3AED] transition-colors" />
                        )}
                      </button>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-sm font-bold ${
                              sub.reviewedToday
                                ? 'text-gray-500 line-through'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {sub.name}
                          </h4>
                          {sub.dueDate && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                              Due: {sub.dueDate}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">Homework:</strong>{' '}
                          {sub.homeworkDue}
                        </p>

                        {sub.currentTopic && (
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            <strong>Current Topic:</strong> {sub.currentTopic}
                          </p>
                        )}

                        {sub.difficultTopicsNotes && (
                          <p className="text-[11px] text-purple-700 dark:text-purple-300 italic bg-purple-50/50 dark:bg-purple-950/30 p-1.5 rounded-lg border border-purple-100 dark:border-purple-900/30">
                            Note: {sub.difficultTopicsNotes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openEditSubjectModal(sub)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors"
                        title="Edit Subject"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSubjectFromChild(activeChild.id, sub.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Review Sessions & Mother's Personal Notes (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Scheduled Review Sessions */}
              <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    Review Sessions & Exam Prep
                  </h4>
                  <button
                    onClick={() => {
                      setSessionDate(new Date().toISOString().slice(0, 10));
                      setSessionTime('17:00');
                      setSessionGoal('');
                      setSessionNotes('');
                      setShowScheduleModal(true);
                    }}
                    className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Schedule
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeChild.reviewSessions && activeChild.reviewSessions.length > 0 ? (
                    activeChild.reviewSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 text-xs ${
                          session.completed
                            ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-75'
                            : 'bg-gradient-to-r from-amber-50/60 to-purple-50/40 dark:from-amber-950/20 dark:to-purple-950/20 border-amber-200/50 dark:border-amber-700/30'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <button
                            onClick={() => toggleReviewSession(activeChild.id, session.id)}
                            className="mt-0.5 shrink-0 focus:outline-hidden"
                            title={session.completed ? 'Mark pending' : 'Mark completed'}
                          >
                            {session.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-amber-500" />
                            )}
                          </button>
                          <div className="min-w-0">
                            <p
                              className={`font-bold ${
                                session.completed
                                  ? 'line-through text-gray-500'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {session.topicOrGoal}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                              {session.date} at {session.time}
                              {session.notes && ` · ${session.notes}`}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteReviewSession(activeChild.id, session.id)}
                          className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                          title="Delete session"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 text-center text-xs text-gray-400">
                      No review sessions scheduled yet. Click <strong>+ Schedule</strong> to plan a session.
                    </div>
                  )}
                </div>
              </div>

              {/* Mother's Personal Notes */}
              <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" /> Mother’s Personal Notes & Dua
                  </span>
                  {!editingNotes ? (
                    <button
                      onClick={() => {
                        setChildNotesInput(activeChild.studyNotes);
                        setEditingNotes(true);
                      }}
                      className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Notes
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveNotes}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                  )}
                </div>

                {editingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      value={childNotesInput}
                      onChange={(e) => setChildNotesInput(e.target.value)}
                      placeholder="Add personal notes, strengths, encouragement, or specific areas needing extra focus..."
                      className="w-full p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNotes(false)}
                        className="px-3 py-1.5 rounded-xl text-xs text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNotes}
                        className="px-3 py-1.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-[#FAF5FF] dark:bg-[#201538] rounded-2xl border border-[#E9D5FF] dark:border-[#38235E] text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{activeChild.studyNotes}"
                  </div>
                )}
              </div>

              {/* Family Learning Affirmation */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200/50 dark:border-indigo-800/30 space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Nurturing Future Leaders
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  "The best gift a parent can give a child is good manners, beneficial knowledge, and heartfelt encouragement."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Add Subject / Assignment */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7C3AED]" />
                {editingSubject ? 'Edit Subject & Assignment' : `Add Subject for ${activeChild?.name}`}
              </h3>
              <button
                onClick={() => setShowAddSubjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSubject} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Mathematics, Biology, English"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Current Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trigonometric Identities, Cellular Biology"
                  value={subjectTopic}
                  onChange={(e) => setSubjectTopic(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Homework Task
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Problems 1-15 on page 40"
                    value={subjectHomework}
                    onChange={(e) => setSubjectHomework(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Due Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow, Friday, Daily"
                    value={subjectDueDate}
                    onChange={(e) => setSubjectDueDate(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Study / Difficult Topics Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Double-check formula sheet; needs extra practice on fractions"
                  value={subjectNotes}
                  onChange={(e) => setSubjectNotes(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#7C3AED]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md"
                >
                  {editingSubject ? 'Update Subject' : 'Save Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Schedule Review Session */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                Schedule Review Session for {activeChild?.name}
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleSession} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Session Date
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Focus Topic or Exam Goal
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-term exam review & trigonometry formulas"
                  value={sessionGoal}
                  onChange={(e) => setSessionGoal(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Notes / Preparation (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Review before Maghrib prayer; prepare flashcards"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md"
                >
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Child Profile Modal */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <Users className="w-4 h-4 text-[#7C3AED]" /> Add Child Profile
              </h3>
              <button
                onClick={() => setShowAddChildModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateChild} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Child's Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maryam"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Age
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="25"
                    value={newChildAge}
                    onChange={(e) => setNewChildAge(parseInt(e.target.value, 10) || 15)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Grade Level
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grade 11, Grade 10"
                    value={newChildGrade}
                    onChange={(e) => setNewChildGrade(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Daily Study Window
                </label>
                <input
                  type="text"
                  placeholder="e.g. 17:00 - 18:00"
                  value={newChildTime}
                  onChange={(e) => setNewChildTime(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Personal Guidance Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Encouragement, study preferences, or support notes..."
                  value={newChildNotes}
                  onChange={(e) => setNewChildNotes(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddChildModal(false)}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md"
                >
                  Save Child Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
