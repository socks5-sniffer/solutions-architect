
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { getTechnicalAdvice } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings. I am the Architect AI, trained on Red Hat's hybrid cloud philosophy and enterprise security standards. How can I assist you with your platform infrastructure today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const advice = await getTechnicalAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* AI Header */}
      <div className="p-4 bg-rh-charcoal text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-rh-red rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight">Solutions Architect AI</h3>
            <p className="text-[10px] text-gray-400 flex items-center gap-1">
              <Sparkles size={10} className="text-rh-red" /> POWERED BY GEMINI 3.0 PRO
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-[10px] font-bold bg-[#3c3f42] px-2 py-1 rounded text-green-400 uppercase tracking-widest border border-gray-700">
            Secure Session
          </div>
          <span className="text-[9px] text-gray-500 font-mono uppercase">Node: SA-GMN-01</span>
        </div>
      </div>

      {/* Message Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-1 shadow-md border ${
                msg.role === 'user' ? 'bg-blue-600 text-white border-blue-400' : 'bg-rh-red text-white border-red-400'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none prose prose-sm max-w-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] flex gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-rh-red text-white flex items-center justify-center animate-pulse border border-red-400">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-gray-200 p-5 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                <Loader2 className="animate-spin text-rh-red" size={20} />
                <span className="text-gray-400 italic text-sm font-medium tracking-tight">Synthesizing architectural recommendation...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Styled as charcoal/black */}
      <div className="p-6 bg-rh-charcoal border-t border-gray-800 shrink-0">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <input 
            type="text" 
            placeholder="Ask about OpenShift security, K8s architecture, or DevSecOps best practices..."
            className="flex-1 p-4 bg-[#212427] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:bg-[#2a2d30] focus:border-rh-red focus:ring-2 focus:ring-rh-red/20 outline-none transition-all text-sm shadow-inner"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-rh-red text-white p-4 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl active:scale-95 flex items-center justify-center border border-red-500"
          >
            <Send size={24} />
          </button>
        </div>
        <div className="text-center mt-4 flex items-center justify-center gap-1.5 text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
          <AlertTriangle size={12} className="text-orange-500" /> 
          Verified Red Hat Solutions Architect context active. Discretion advised.
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
