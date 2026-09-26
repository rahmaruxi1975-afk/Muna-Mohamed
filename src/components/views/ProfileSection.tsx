import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  User,
  Camera,
  Edit2,
  Save,
  GraduationCap,
  DollarSign,
  Heart,
  Flame,
  Award,
  Sparkles,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

const avatarPresets = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
];

export const ProfileSection: React.FC = () => {
  const {
    profile,
    updateProfile,
    modules,
    financeData,
    quranProgress,
  } = useDashboard();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [motivationalInput, setMotivationalInput] = useState(profile.motivationalStatement);
  const [locationInput, setLocationInput] = useState(profile.location);

  const [newGoalInput, setNewGoalInput] = useState('');

  const completedModules = modules.filter((m) => m.completed).length;
  const totalEarned = financeData.records.reduce((acc, r) => acc + r.amount, 0);

  const handleSaveProfile = () => {
    updateProfile({
      name: nameInput,
      bio: bioInput,
      motivationalStatement: motivationalInput,
      location: locationInput,
    });
    setIsEditing(false);
    playGentleChime();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateProfile({ avatarUrl: reader.result });
          playGentleChime();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    updateProfile({
      monthlyGoals: [...profile.monthlyGoals, newGoalInput.trim()],
    });
    setNewGoalInput('');
    playGentleChime();
  };

  const handleDeleteGoal = (index: number) => {
    updateProfile({
      monthlyGoals: profile.monthlyGoals.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 md:p-8 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Upload */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-[#7C3AED]/20 shadow-xl bg-[#FAF5FF] dark:bg-[#2A1D47] flex items-center justify-center">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-12 h-12 text-[#7C3AED]" />
              )}
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-[#7C3AED] text-white shadow-md hover:bg-[#6D28D9] cursor-pointer transition-transform hover:scale-110"
              title="Upload profile photo"
            >
              <Camera className="w-4 h-4" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Bio & Details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold font-serif-display text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD] mt-0.5">
                  {profile.location} · Somali Wealth Academy Student
                </p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#7C3AED] text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold shadow-md shadow-[#7C3AED]/20 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> Save Profile
                </button>
              )}
            </div>

            {/* Roles Chips */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
              {profile.roles.map((role, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF5FF] dark:bg-[#251842] text-[#7C3AED] dark:text-[#D8B4FE] border border-[#D8B4FE]/40"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Motivational statement */}
            <p className="text-xs text-gray-600 dark:text-gray-300 italic max-w-2xl leading-relaxed">
              "{profile.motivationalStatement}"
            </p>
          </div>
        </div>

        {/* Preset Avatars Bar */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>Choose preset avatar:</span>
          <div className="flex gap-2">
            {avatarPresets.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="Avatar option"
                onClick={() => {
                  updateProfile({ avatarUrl: url });
                  playGentleChime();
                }}
                className="w-8 h-8 rounded-full object-cover cursor-pointer border-2 border-transparent hover:border-[#7C3AED] transition-all"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Edit Form Modal/Drawer if editing */}
      {isEditing && (
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#7C3AED] shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white font-serif-display">
            Edit Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Bio Description</label>
            <textarea
              rows={2}
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Personal Motivational Statement
            </label>
            <input
              type="text"
              value={motivationalInput}
              onChange={(e) => setMotivationalInput(e.target.value)}
              className="w-full mt-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-bold"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Grid: Key Stats & Monthly Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Journey Stats */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" /> Core Journey Metrics
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800/30">
              <span className="text-[11px] font-medium text-gray-500">Academy Modules</span>
              <p className="text-xl font-bold text-[#7C3AED] dark:text-[#D8B4FE] mt-1">
                {completedModules} / 26
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30">
              <span className="text-[11px] font-medium text-gray-500">Earnings Recorded</span>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                ${totalEarned}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/30">
              <span className="text-[11px] font-medium text-gray-500">Quran Reading Streak</span>
              <p className="text-xl font-bold text-[#D4AF37] mt-1">
                {quranProgress.streakDays} Days
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800/30">
              <span className="text-[11px] font-medium text-gray-500">Zoom Classes</span>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                4x / Week
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Goals Checklist */}
        <div className="bg-white dark:bg-[#18122B] rounded-3xl p-6 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" /> Monthly Growth Goals
            </h3>
            <span className="text-xs text-gray-400">{profile.monthlyGoals.length} Goals</span>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {profile.monthlyGoals.map((goal, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{goal}</span>
                </div>
                <button
                  onClick={() => handleDeleteGoal(idx)}
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Goal Input */}
          <form onSubmit={handleAddGoal} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add new personal monthly goal..."
              value={newGoalInput}
              onChange={(e) => setNewGoalInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-900 dark:text-white focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shrink-0"
            >
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
