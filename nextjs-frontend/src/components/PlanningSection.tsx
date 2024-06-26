import { FC } from 'react';
import Markdown from "react-markdown";

interface PlanningSectionProps {
  loading: boolean;
  planText: string;
}

const PlanningSection: FC<PlanningSectionProps> = ({ loading, planText }) => {
  return (
    <section className="w-full lg:w-5/12 h-full">
      <div className="h-full flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-white">Planning</h2>
        <div className="mt-4 p-2 md:p-4 bg-gray-100 rounded-md text-xs md:text-xs text-black overflow-y-auto h-[350px]">
          {loading && <div>Loading...</div>}
          <Markdown>{planText}</Markdown>
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;