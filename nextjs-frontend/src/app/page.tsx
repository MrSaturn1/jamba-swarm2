"use client";

import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import SessionSidebar from "../components/SessionSidebar";
import Header from "../components/Header";
import PlanningSection from "../components/PlanningSection";
import TaskDistributionSection from "../components/TaskDistributionSection";
import Footer from "../components/Footer";

// Define interfaces based on backend schemas
interface AgentSchema {
  name: string;
  system_prompt: string;
  task: string;
  description: string;
  progress: number;
}

interface JambaSwarmResponse {
  task: string;
  plan: string;
  agents: AgentSchema[];
  response: string;
}

interface Session {
  id: string;
  name: string;
  planText: string;
  agents: any[];
}

const Page: FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [appName, setAppName] = useState<string>("");
  const [planText, setPlanText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<string>("");

  useEffect(() => {
    const savedSessions = localStorage.getItem('sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    const interval = setInterval(() => {
      agents.forEach(agent => {
        if (agent.progress < 100) {
          const newProgress = Math.min(agent.progress + 10, 100);
          updateAgentProgress(agent.name, newProgress);
        }
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [agents]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appName.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/create_swarm', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: appName }),
      });

      console.log("Received response:", response);

      if (!response.ok) {
        throw new Error('Failed to create swarm');
      }

      const data: JambaSwarmResponse = await response.json();
      setAgents(data.agents);
      console.log("Parsed response data:", data);

      let sessionToUpdate: Session = {
        id: Date.now().toString(),
        name: appName,
        planText: data.plan,
        agents: data.agents
      };

      setSessions(prevSessions => [...prevSessions, sessionToUpdate]);
      setCurrentSession(sessionToUpdate.id);
      setPlanText(data.plan);

      // If you still want to use server-sent events for real-time updates:
      const planningSource = new EventSource(`http://localhost:8000/planning/stream?task=${encodeURIComponent(appName)}&session_id=${sessionToUpdate.id}`);
      planningSource.onmessage = (event) => {
        const planData = JSON.parse(event.data);
        if (planData.memory === 'END_OF_STREAM') {
          planningSource.close();
          setLoading(false);
          return;
        }
        setPlanText((prev) => {
          const updatedPlanText = prev + "\n" + planData.memory;
          setSessions(prevSessions => 
            prevSessions.map(session => 
              session.id === sessionToUpdate.id 
                ? { ...session, planText: updatedPlanText }
                : session
            )
          );
          return updatedPlanText;
        });
      };

      planningSource.onerror = () => {
        console.error('EventSource failed:', event);
        setLoading(false);
      };

      setAppName("");
    } catch (error) {
      console.error("Error creating swarm:", error);
      setLoading(false);
    }
  };

  const handleSessionClick = (session: Session) => {
    setCurrentSession(session.id);
    setPlanText(session.planText);
    setAgents(session.agents);
    setAppName(""); // Clear the input field when switching sessions
  };

  const handleNewSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      name: "New Session",
      planText: "",
      agents: []
    };
    setSessions(prevSessions => [...prevSessions, newSession]);
    setCurrentSession(newSession.id);
    setPlanText("");
    setAgents([]);
    setAppName(""); // Clear the input field when creating a new session
  };

  const updateAgentProgress = async (agentName: string, progress: number) => {
    try {
      const response = await fetch('http://localhost:8000/api/update_agent_progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent_name: agentName, progress: progress }),
      });
      if (!response.ok) {
        throw new Error('Failed to update agent progress');
      }
      
      // Update local state
      setAgents(prevAgents => prevAgents.map(agent => 
        agent.name === agentName ? { ...agent, progress } : agent
      ));
    } catch (error) {
      console.error('Error updating agent progress:', error);
    }
  };

  return (
    <div className="flex">
      <SessionSidebar 
        sessions={sessions}
        currentSession={currentSession}
        onNewSession={handleNewSession}
        onSessionClick={handleSessionClick}
        onLogout={() => console.log("Logout clicked")}
      />
      <div className="flex flex-col w-11/12 min-h-screen">
        <Header />
        <main className="flex flex-1 p-4 md:p-6 space-x-4 h-full">
          <PlanningSection loading={loading} planText={planText} />
          <TaskDistributionSection agents={agents} />
        </main>
        <Footer 
          appName={appName}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Page;