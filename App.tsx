
import React from 'react';
import { Bot, Bell } from 'lucide-react';
import AIAdvisor from './components/AIAdvisor';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f0f0f0]">
      {/* Standalone Header */}
      <header>  </header>

      {/* Main Chat Bot Container */}
      <main className="flex-1 overflow-hidden flex">
        <AIAdvisor />
      </main>
    </div>
  );
};

export default App;
