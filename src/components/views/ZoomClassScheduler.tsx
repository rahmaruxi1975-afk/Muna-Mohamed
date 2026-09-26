import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { ZoomClass } from '../../types';
import {
  Video,
  Clock,
  Calendar,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Circle,
  Bell,
  Save,
  Plus,
  Users,
  MessageSquare,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

export const ZoomClassScheduler: React.FC = () => {
  const { zoomClasses, updateZoomClass, toggleZoomAttended } = useDashboard();

  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<ZoomClass>>({});
  const [countdownText, setCountdownText] = useState('');

  // Find the next upcoming Zoom class
  const nextClass = zoomClasses[0];

  useEffect(() => {
    const calcCountdown = () => {
      // Simple preview countdown simulator for next class
      setCountdownText('Next live session starts in approximately 4 hours (19:00 CST)');
    };
    calcCountdown();
  }, [nextClass]);

  const handleStartEdit = (zc: ZoomClass) => {
    setEditingClassId(zc.id);
    setEditFormData({ ...zc });
  };

  const handleSaveEdit = () => {
    if (!editingClassId) return;
    updateZoomClass(editingClassId, editFormData);
    setEditingClassId(null);
    playGentleChime();
  };

  const totalSessions = zoomClasses.length;
  const attendedCount = zoomClasses.filter((z) => z.attended).length;
  const attendanceRate = Math.round((attendedCount / totalSessions) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#2E1852] to-[#1A0E30] text-white rounded-3xl p-6 md:p-8 border border-[#7C3AED]/30 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D8B4FE]">
              <Video className="w-3.5 h-3.5 text-[#D4AF37]" /> Somali Wealth Academy Live
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display">
              Zoom Class Scheduler (4x Per Week)
            </h2>
            <p className="text-sm text-gray-300">
              Interactive live training, personalized feedback on Stan Store and Canva, and student accountability.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <Clock className="w-4 h-4" />
              <span>{countdownText}</span>
            </div>
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
              <span className="text-2xl md:text-3xl font-bold text-white">{attendedCount}/{totalSessions}</span>
              <p className="text-xs text-gray-300 mt-0.5">Sessions Attended</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[120px]">
              <span className="text-2xl md:text-3xl font-bold text-[#D4AF37]">{attendanceRate}%</span>
              <p className="text-xs text-gray-300 mt-0.5">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Sessions Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {zoomClasses.map((zc) => {
          const isEditing = editingClassId === zc.id;

          return (
            <div
              key={zc.id}
              className={`p-6 rounded-3xl border transition-all ${
                zc.attended
                  ? 'bg-emerald-50/40 dark:bg-[#15241E] border-emerald-300 dark:border-emerald-800/40'
                  : 'bg-white dark:bg-[#18122B] border-[#EBE7F5] dark:border-[#281D45] hover:border-[#D8B4FE]'
              }`}
            >
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-white/10">
                    <span className="text-xs font-bold text-[#7C3AED] dark:text-[#D8B4FE]">
                      Edit Class Details
                    </span>
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-gray-500">Day of Week</label>
                      <input
                        type="text"
                        value={editFormData.dayOfWeek || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, dayOfWeek: e.target.value })}
                        className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-gray-500">Time (CST)</label>
                      <input
                        type="text"
                        value={editFormData.time || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                        className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-gray-500">Class Topic</label>
                    <input
                      type="text"
                      value={editFormData.topic || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, topic: e.target.value })}
                      className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-gray-500">Zoom Meeting Link</label>
                    <input
                      type="text"
                      value={editFormData.meetingLink || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, meetingLink: e.target.value })}
                      className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-gray-500">Class Notes & Prep</label>
                    <textarea
                      rows={2}
                      value={editFormData.instructorNotes || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, instructorNotes: e.target.value })}
                      className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#7C3AED] text-white">
                        {zc.dayOfWeek}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {zc.time} CST
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(zc)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        title="Edit session details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleZoomAttended(zc.id)}
                        className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          zc.attended
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-200'
                        }`}
                      >
                        {zc.attended ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Attended
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5" /> Mark Attended
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                      {zc.topic}
                    </h3>
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-0.5 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-[#7C3AED]" /> Notes & Questions:
                      </p>
                      {zc.instructorNotes}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Bell className="w-3 h-3 text-[#D4AF37]" /> Reminder: {zc.reminderMinutesBefore}m before
                    </span>

                    <a
                      href={zc.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-xs font-semibold shadow-md shadow-[#7C3AED]/20 hover:from-[#6D28D9] hover:to-[#5B21B6] transition-all"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Zoom Link
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
