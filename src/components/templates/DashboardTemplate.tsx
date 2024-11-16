"use client";

import HistoryView from '../widgets/HistoryView';
import { Habit } from '@/types/habit';
import AnalyticsSection from '../widgets/AnalyticsSection';
import MotivationalAI from '../widgets/MotivationalAI';

import { Chart as ChartJS, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';
ChartJS.register(BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

interface DashboardTemplateProps {
  initialHabits: Habit[];
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ initialHabits }) => {

  return (
    <div className="">
      <div className="mb-10">
        <h3 className="text-lg font-semibold">History</h3>
        <HistoryView history={initialHabits} />
      </div>
      {initialHabits.length > 0 && <AnalyticsSection habits={initialHabits} />}
      <MotivationalAI habits={initialHabits} />
    </div>
  );
};

export default DashboardTemplate;
