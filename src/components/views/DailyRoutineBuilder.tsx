import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { RoutineTask } from '../../types';
import {
  ListTodo,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Moon,
  Flame,
} from 'lucide-react';

export const DailyRoutineBuilder: React.FC = () => {
  const {
    routineTasks,
    toggleRoutineTask,
    addRoutineTask,
    deleteRoutineTask,
    sleepRoutine,
  } = useDashboard();

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTime, setTaskTime] = useState('10:00 AM');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDuration, setTaskDuration] = useState(45);
  const [taskCategory, setTaskCategory] = useState<RoutineTask['category']>('Academy Study');

  const completedCount = routineTasks.filter((t) => t.completed).length;
  const progressPercent = routineTasks.length > 0 ? Math.round((completedCount / routineTasks.length) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addRoutineTask({
      time: taskTime,
      title: taskTitle,
      completed: false,
      category: taskCategory,
      durationMinutes: taskDuration,
      reminderEnabled: true,
    });

    setTaskTitle('');
    setShowAddModal(false);
  };

  const getCategoryColor = (cat: RoutineTask['category']) => {
    switch (cat) {
      case 'Worship':
      case 'Quran':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
      case 'Exercise':
        return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200';
      case 'Children':
      case 'Family':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200';
      case 'Academy Study':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200';
      case 'Marketing':
      case 'Content':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200';
      case 'Night Routine':
        return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] dark:bg-[#251842] text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
              <Clock className="w-3.5 h-3.5" /> High-Performance Mother & Student Routine
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-display text-gray-900 dark:text-white">
              Daily Routine & Flow Builder
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
              From early morning Fajr and gentle mobility to Somali Wealth Academy study, children's review, and restful 10:00 PM bedtime.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="p-4 bg-[#FAF5FF] dark:bg-[#201538] border border-[#E9D5FF] dark:border-[#38235E] rounded-2xl text-center min-w-[120px]">
              <span className="text-2xl md:text-3xl font-bold text-[#7C3AED] dark:text-[#D8B4FE]">
                {progressPercent}%
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {completedCount}/{routineTasks.length} Completed
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Routine Block
            </button>
          </div>
        </div>

        {/* Global Routine Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Routine Timeline Checklist */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
            Full Daily Flow (05:00 AM – 10:00 PM)
          </h3>
          <span className="text-xs text-gray-400">Click any item to toggle completion</span>
        </div>

        <div className="space-y-3">
          {routineTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleRoutineTask(task.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 text-gray-400'
                  : 'bg-gray-50/70 dark:bg-white/5 border-gray-100 dark:border-white/5 hover:border-[#D8B4FE]'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <button className="shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 hover:text-[#7C3AED]" />
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {task.time}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getCategoryColor(
                        task.category
                      )}`}
                    >
                      {task.category.toUpperCase()}
                    </span>
                  </div>
                  <p
                    className={`text-sm font-semibold truncate ${
                      task.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRoutineTask(task.id);
                }}
                className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                title="Remove task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bedtime Wind-Down Reminder Card */}
      <div className="bg-gradient-to-r from-purple-900/10 to-indigo-900/10 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200/60 dark:border-purple-800/40 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#D8B4FE]">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Target Bedtime: 10:00 PM ({sleepRoutine.consistencyStreak} Day Consistency Streak)
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
              "Muna, close your tabs, recite Ayat al-Kursi, and let your mind unwind. You did enough today."
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#18122B] w-full max-w-md rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#7C3AED]" /> Add Routine Task
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Canva Design Practice"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Time Block</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 02:00 PM"
                    value={taskTime}
                    onChange={(e) => setTaskTime(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as RoutineTask['category'])}
                    className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                  >
                    <option value="Worship">Worship</option>
                    <option value="Quran">Quran</option>
                    <option value="Exercise">Exercise</option>
                    <option value="Academy Study">Academy Study</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Content">Content</option>
                    <option value="Children">Children</option>
                    <option value="Family">Family</option>
                    <option value="Night Routine">Night Routine</option>
                  </select>
                </div>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
