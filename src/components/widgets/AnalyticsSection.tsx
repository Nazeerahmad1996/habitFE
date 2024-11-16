import React from 'react';
import WeeklyProgressChart from '@/components/modules/WeeklyProgressChart';
import StreakTrendsChart from '@/components/modules/StreakTrendsChart';
import CompletionRateChart from '@/components/modules/CompletionRateChart';
import { Habit } from '@/types/habit';

interface AnalyticsSectionProps {
  habits: Habit[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ habits }) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6">
        <WeeklyProgressChart habits={habits} />
        <StreakTrendsChart habits={habits} />
        <CompletionRateChart habits={habits} />
      </div>
    </section>
  );
};

export default AnalyticsSection;
