import { FC } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

interface TaskDistributionSectionProps {
  agents: AgentSchema[];
}

const TaskDistributionSection: FC<TaskDistributionSectionProps> = ({ agents }) => {
  return (
    <section className="w-full lg:w-7/12 h-full">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white">Task Distribution</h2>
        <div className="mt-4 overflow-x-auto rounded-md">
          <Table className="w-full table-auto min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs md:text-sm text-black whitespace-nowrap">Agent</TableHead>
                <TableHead className="text-xs md:text-sm text-black whitespace-nowrap">Description</TableHead>
                <TableHead className="text-xs md:text-sm text-black whitespace-nowrap">Task</TableHead>
                <TableHead className="text-xs md:text-sm text-black whitespace-nowrap">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell className="px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-xs whitespace-nowrap text-black">{agent.name}</TableCell>
                  <TableCell className="px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-xs whitespace-nowrap text-black">
                    {agent.description.length > 50 ? agent.description.substring(0, 50) + '...' : agent.description}
                  </TableCell>
                  <TableCell className="px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-xs whitespace-nowrap text-black">
                    {agent.task.length > 50 ? agent.task.substring(0, 50) + '...' : agent.task}
                  </TableCell>
                  <TableCell className="px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-xs whitespace-nowrap text-black">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{width: `${agent.progress}%`}}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{agent.progress}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default TaskDistributionSection;