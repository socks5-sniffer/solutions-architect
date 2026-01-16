
import React from 'react';
import { Bot, Bell } from 'lucide-react';
import AIAdvisor from './components/AIAdvisor';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f0f0f0]">
      {/* Standalone Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Platform One Architect</h1>
          </div>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded uppercase tracking-wider">
            Secure Terminal
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-gray-500 hover:text-primary relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800 leading-none">Security Admin</p>
              <p className="text-xs text-gray-500">Identity: Root-lvl-1</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-primary p-0.5">
              <img src="https://picsum.photos/40/40" alt="Avatar" className="rounded-full w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Bot Container */}
      <main className="flex-1 overflow-hidden p-4 md:p-8 flex justify-center items-center">
        <div className="w-full max-w-5xl h-full flex flex-col">
          <AIAdvisor />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-2 px-6 bg-white border-t border-gray-200 text-center text-[10px] text-gray-400 font-medium">
        &copy; 2024 Enterprise Solutions Platform. Confidential & Proprietary.
      </footer>
    </div>
  );
};

export default App;
