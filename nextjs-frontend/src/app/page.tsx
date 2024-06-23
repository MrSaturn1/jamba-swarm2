"use client";

import Link from "next/link";
import Button from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { FC, SVGProps, useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Agent {
  name: string;
  task: string;
  description: string;
  progress: number;
}

interface PlanUpdate {
  text: string;
}

const Page: FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [appName, setAppName] = useState<string>("");
  const [planText, setPlanText] = useState<string>("");

  useEffect(() => {
    // Connect to the planning SSE stream
    const planningSource = new EventSource("http://localhost:8000/planning/stream");
    planningSource.onmessage = (event) => {
      const data: PlanUpdate = JSON.parse(event.data);
      setPlanText((prev) => prev + "\n" + data.text);
    };

    // Connect to the task SSE stream
    const taskSource = new EventSource("http://localhost:8000/tasks/stream");
    taskSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAgents(data.tasks);
    };

    return () => {
      planningSource.close();
      taskSource.close();
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appName.trim() === "") return;

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: appName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create app');
      }

      const data = await response.json();
      setAgents(data);
      setAppName("");
    } catch (error) {
      console.error("Error creating app:", error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base" prefetch={false}>
          <CpuIcon className="w-6 h-6" />
          <span>Multi-Agent Task Dashboard</span>
        </Link>
        <nav className="hidden font-medium md:flex flex-row items-center gap-5 text-sm lg:gap-6 ml-auto">
          <Link href="#" className="font-bold text-white" prefetch={false}>
            Planning
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Agents
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Tasks
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 p-4 md:p-10">
        <section className="w-1/2 pr-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Planning</h2>
              <p className="text-white">Monitor the current stage of your workflow.</p>
              <div className="mt-4 p-4 bg-gray-100 rounded-md whitespace-pre-wrap text-black">{planText}</div>
            </div>
          </div>
        </section>
        <section className="w-1/2 pl-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Task Distribution</h2>
                <p className="text-white">Manage the tasks assigned to your agents.</p>
              </div>
            </div>
            <div className="mt-4">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Agent</TableHead>
                    <TableHead className="text-black">Description</TableHead>
                    <TableHead className="text-black">Task</TableHead>
                    <TableHead className="text-black">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{agent.name}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-black">{agent.description}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-black">{agent.task}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${agent.progress}%` }} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center h-16 px-4 border-t shrink-0 md:px-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor="app-name" className="text-lg font-semibold text-black">Create App:</label>
          <input
            type="text"
            id="app-name"
            value={appName}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 text-black" // Ensure text is visible
          />
          <Button type="submit" variant="outline">Submit</Button>
        </form>
      </footer>
    </div>
  );
};

const CpuIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
};

export default Page;
