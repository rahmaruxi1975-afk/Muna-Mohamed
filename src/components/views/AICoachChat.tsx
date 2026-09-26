import React, { useState, useRef, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  RefreshCw,
  User,
  Lightbulb,
  BookOpen,
  ShoppingBag,
  Clock,
  Heart,
} from 'lucide-react';
import { playGentleChime } from '../../utils/audio';

const quickPrompts = [
  {
    icon: Clock,
    title: 'Study Schedule',
    prompt: 'Help me plan a 1-hour high-focus Somali Wealth Academy study block for today while managing my kids.',
  },
  {
    icon: ShoppingBag,
    title: 'Stan Store Advice',
    prompt: 'What are 3 high-converting digital products I can create on Canva and list on my Stan Store this week?',
  },
  {
    icon: Sparkles,
    title: 'TikTok Shop Strategy',
    prompt: 'Give me 5 viral video hooks for promoting affiliate products on TikTok without showing my face.',
  },
  {
    icon: Heart,
    title: 'Motherhood & Balance',
    prompt: 'Give me a compassionate Islamic reminder and practical advice on balancing my goals with family life.',
  },
];

export const AICoachChat: React.FC = () => {
  const {
    chatMessages,
    addChatMessage,
    clearChat,
    profile,
    modules,
    financeData,
    language,
  } = useDashboard();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addChatMessage(userMessage);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const activeModule = modules.find((m) => !m.completed);
      const totalEarned = financeData.records.reduce((s, r) => s + r.amount, 0);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          conversationHistory: chatMessages.slice(-8), // Send last 8 for context
          userContext: {
            name: profile.name,
            currentModule: activeModule ? `Module ${activeModule.number}: ${activeModule.title}` : 'All complete',
            totalEarned,
            monthlyTarget: financeData.monthlyTarget,
            language,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get coach response');
      }

      const data = await response.json();
      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant' as const,
        content: data.reply || 'Assalamu Alaikum Muna, I am here to help you succeed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      addChatMessage(assistantMessage);
      playGentleChime();
    } catch (err) {
      console.error(err);
      addChatMessage({
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: 'Muna, I apologize. I had trouble connecting to the server. Please check your internet or try asking again in a moment.',
        timestamp: 'Just now',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#18122B] rounded-3xl p-5 border border-[#EBE7F5] dark:border-[#281D45] shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#D4AF37] flex items-center justify-center text-white shadow-md shadow-[#7C3AED]/25">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900 dark:text-white font-serif-display">
                  Muna AI Coach
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  Online & Ready
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Somali Wealth Academy Study Advisor & Digital Marketing Mentor
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors text-xs flex items-center gap-1"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 py-3 bg-gray-50/50 dark:bg-white/[0.02] rounded-3xl border border-[#EBE7F5] dark:border-[#281D45] p-4">
        {chatMessages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                  isAssistant
                    ? 'bg-gradient-to-br from-[#7C3AED] to-[#D4AF37] text-white shadow-xs'
                    : 'bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#D8B4FE]'
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  isAssistant
                    ? 'bg-white dark:bg-[#1E1535] border border-[#E9D5FF]/60 dark:border-[#38235E] text-gray-800 dark:text-gray-100 shadow-xs'
                    : 'bg-[#7C3AED] text-white font-medium shadow-md shadow-[#7C3AED]/20'
                }`}
              >
                <div className="whitespace-pre-wrap space-y-2">{msg.content}</div>
                <span
                  className={`text-[9px] block mt-1.5 ${
                    isAssistant ? 'text-gray-400 text-right' : 'text-purple-200 text-right'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-lg mr-auto">
            <div className="w-8 h-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1535] border border-[#E9D5FF] dark:border-[#38235E] flex items-center gap-2 text-xs text-[#7C3AED]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Muna AI Coach is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
        {quickPrompts.map((qp, i) => {
          const Icon = qp.icon;
          return (
            <button
              key={i}
              onClick={() => handleSendMessage(qp.prompt)}
              disabled={isLoading}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#18122B] border border-[#EBE7F5] dark:border-[#281D45] hover:border-[#7C3AED] text-left transition-all text-xs group"
            >
              <div className="flex items-center gap-1.5 font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#7C3AED]">
                <Icon className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="truncate">{qp.title}</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">{qp.prompt}</p>
            </button>
          );
        })}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-white dark:bg-[#18122B] rounded-2xl p-2 border border-[#EBE7F5] dark:border-[#281D45] shadow-md shrink-0 flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask Muna AI Coach about course lessons, Stan Store products, or study schedule..."
          className="flex-1 p-2 bg-transparent text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden resize-none max-h-24"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 text-white transition-all shadow-sm"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
