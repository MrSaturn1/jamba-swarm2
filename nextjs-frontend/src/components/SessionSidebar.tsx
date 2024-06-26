'use client';
import { FC, useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';

interface Session {
  id: string;
  name: string;
  planText: string;
  agents: any[];
}

interface SessionSidebarProps {
  sessions: Session[];
  currentSession: string;
  onNewSession: () => void;
  onSessionClick: (session: Session) => void;
  onLogout: () => void;
}

const SessionSidebar: FC<SessionSidebarProps> = ({ 
  sessions, 
  currentSession, 
  onNewSession, 
  onSessionClick,
  onLogout
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showExpandedContent, setShowExpandedContent] = useState(false);

  const summarizeSessionName = (name: string): string => {
    const words = name.split(' ');
    if (words.length <= 4) return name;
    return words.slice(0, 4).join(' ') + '...';
  };

  return (
    <>
      <div
        className={`max-w-[90px] w-full transition-all duration-400 ease-out translate-x-0 max-lg:hidden ${
          showTitle ? 'max-w-[250px]' : ''
        }`}
      />
      <div
        className={`flex flex-col fixed flex-shrink-0 max-w-[250px] w-full transition-all ease-out duration-300 translate-x-0 min-h-screen border-r border-gray-900 max-lg:hidden bg-black ${
          !showTitle ? 'max-w-[90px]' : ''
        }`}
        onMouseEnter={() => {
          setShowTitle(true);
          setTimeout(() => setShowExpandedContent(true), 150);
        }}
        onMouseLeave={() => {
          setShowExpandedContent(false);
          setTimeout(() => setShowTitle(false), 150);
        }}
      >
        <div className="flex flex-col justify-between p-4 w-full h-screen">
          <div className="flex flex-col h-[88%] w-[90%]">
            <button
              className="mt-4 bg-white text-black px-2 py-1 text-xs rounded overflow-hidden whitespace-nowrap"
              onClick={onNewSession}
            >
              {showExpandedContent ? (
                <span className={`fade-in ${showExpandedContent ? 'show' : ''}`}>New Session</span>
              ) : '+'}
            </button>
            <div className="flex-grow mt-3 overflow-y-auto">
              {sessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`cursor-pointer hover:bg-destructive hover:text-white rounded-md p-2 py-3 my-1 overflow-hidden whitespace-nowrap ${
                    session.id === currentSession ? 'bg-primary text-white' : ''
                  }`}
                  onClick={() => onSessionClick(session)}
                >
                  {showExpandedContent ? (
                    <span className={`fade-in ${showExpandedContent ? 'show' : ''}`}>
                      {summarizeSessionName(session.name)}
                    </span>
                  ) : '•'}
                </div>
              ))}
            </div>
          </div>
          <div 
            className="p-2 py-3 hover:bg-destructive hover:text-white rounded-md cursor-pointer"
            onClick={onLogout}
          >
            <div className="flex items-center justify-start w-full overflow-hidden whitespace-nowrap">
              <LogOut size={24} className="mr-2" />
              {showExpandedContent && (
                <span className={`fade-in ${showExpandedContent ? 'show' : ''}`}>Logout</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transition: opacity 150ms ease-in;
        }
        .fade-in.show {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default SessionSidebar;