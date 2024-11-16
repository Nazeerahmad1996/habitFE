import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Habit } from '@/types/habit';

interface CompletionRateChartProps {
  habits: Habit[];
}

const CompletionRateChart: React.FC<CompletionRateChartProps> = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];

  const completedCount = habits.filter(habit => 
    habit.completedDates.some(date => new Date(date).toISOString().startsWith(today))
  ).length;

  const missedCount = habits.length - completedCount;

  const data = {
    labels: ['Completed', 'Missed'],
    datasets: [
      {
        data: [completedCount, missedCount],
        backgroundColor: ['#34d399', '#f87171'],
        hoverBackgroundColor: ['#10b981', '#ef4444'],
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Completion Rate For Today</h3>
      <Pie data={data} />
    </div>
  );
};

export default CompletionRateChart;
