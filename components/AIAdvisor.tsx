
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertTriangle, Copy, Check } from 'lucide-react';
import { getTechnicalAdvice } from '../services/gemini';
import { InputValidator } from '../services/inputValidator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings. I am the Architect AI, trained on enterprise hybrid cloud architecture and security standards. How can I assist you with your platform infrastructure today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [inputError, setInputError] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Clear any previous errors
    setInputError('');

    // Validate input before sending
    const validationResult = InputValidator.validate(input);
    
    if (!validationResult.isValid) {
      setInputError(validationResult.error || 'Invalid input');
      return;
    }

    const userMsg = validationResult.sanitizedInput;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const advice = await getTechnicalAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Clear error when user starts typing again
    if (inputError) {
      setInputError('');
    }
    
    // Show warning if approaching limit
    if (value.length > 9000) {
      setInputError(`Warning: ${10000 - value.length} characters remaining`);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatMarkdown = (text: string) => {
    // Split into lines for processing
    const lines = text.split('\n');
    const formatted: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        formatted.push(
          listType === 'ol' ? (
            <ol key={formatted.length} className="list-decimal list-outside ml-5 space-y-1 my-3">
              {currentList.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />)}
            </ol>
          ) : (
            <ul key={formatted.length} className="list-disc list-outside ml-5 space-y-1 my-3">
              {currentList.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />)}
            </ul>
          )
        );
        currentList = [];
        listType = null;
      }
    };

    const formatInline = (line: string) => {
      return line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
    };

    lines.forEach((line, idx) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          flushList();
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
        } else {
          formatted.push(
            <pre key={formatted.length} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-3 text-xs font-mono">
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
          codeLanguage = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        flushList();
        formatted.push(<h3 key={formatted.length} className="text-lg font-bold text-gray-900 mt-4 mb-2">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        flushList();
        formatted.push(<h2 key={formatted.length} className="text-xl font-bold text-gray-900 mt-5 mb-3">{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        flushList();
        formatted.push(<h1 key={formatted.length} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{line.slice(2)}</h1>);
      }
      // Ordered list
      else if (/^\d+\.\s/.test(line)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(line.replace(/^\d+\.\s/, ''));
      }
      // Unordered list
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(line.trim().slice(2));
      }
      // Regular paragraph
      else if (line.trim()) {
        flushList();
        formatted.push(<p key={formatted.length} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
      }
      // Empty line
      else {
        flushList();
      }
    });

    flushList();
    return formatted;
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* AI Header */}
      <div className="p-4 bg-dark text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-gray-800">
            <Bot size={28} />
          </div>
          <div>
            <h3 className="font-black text-lg tracking-tight">Solutions Architect AI</h3>
            <p className="text-[10px] text-gray-400 flex items-center gap-1">
              <Sparkles size={10} className="text-primary" /> POWERED BY GEMINI 3.0 PRO
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
                msg.role === 'user' ? 'bg-blue-600 text-white border-blue-400' : 'bg-primary text-white border-red-400'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`relative group p-5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
              }`}>
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none">
                    {formatMarkdown(msg.content)}
                  </div>
                ) : (
                  <div>{msg.content}</div>
                )}
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.content, idx)}
                    className="absolute bottom-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all opacity-0 group-hover:opacity-100 border border-gray-300"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-gray-600" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] flex gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center animate-pulse border border-red-400">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-gray-200 p-5 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                <Loader2 className="animate-spin text-primary" size={20} />
                <span className="text-gray-400 italic text-sm font-medium tracking-tight">Synthesizing architectural recommendation...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Styled as charcoal/black */}
      <div className="p-6 bg-dark border-t border-gray-800 shrink-0">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Ask about Kubernetes, container platforms, or DevSecOps best practices..."
              className={`w-full p-4 bg-[#212427] border rounded-xl text-white placeholder-gray-500 focus:bg-[#2a2d30] focus:ring-2 outline-none transition-all text-sm shadow-inner ${
                inputError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-700 focus:border-primary focus:ring-primary/20'
              }`}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              maxLength={10000}
            />
            {inputError && (
              <p className="text-xs text-red-400 mt-2 ml-1">{inputError}</p>
            )}
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading || !!inputError}
            className="bg-primary text-white p-4 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl active:scale-95 flex items-center justify-center border border-red-500"
            title={inputError ? inputError : 'Send message'}
          >
            <Send size={24} />
          </button>
        </div>
        <div className="text-center mt-4 flex items-center justify-center gap-1.5 text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
          <AlertTriangle size={12} className="text-orange-500" /> 
          Verified Enterprise Solutions Architect context active. Discretion advised.
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
