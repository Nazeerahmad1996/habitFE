import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Habit } from '@/types/habit';


interface StreakTrendsChartProps {
  habits: Habit[];
}

const StreakTrendsChart: React.FC<StreakTrendsChartProps> = ({ habits }) => {
  const completedDates = habits.flatMap(habit => habit.completedDates);

  const startDate = new Date(Math.min(...completedDates.map(date => new Date(date).getTime())));
  const endDate = new Date();
  
  const weeks = Math.ceil((endDate.getTime() - new Date(startDate).getTime()) / (7 * 24 * 60 * 60 * 1000));

  const weeklyCounts = Array(weeks).fill(0);

  completedDates.forEach(date => {
    const weekIndex = Math.floor((new Date(date).getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    if (weekIndex >= 0 && weekIndex < weeks) {
      weeklyCounts[weekIndex]++;
    }
  });

  const labels = Array.from({ length: weeks }, (_, index) => {
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(startDate.getDate() + index * 7);
    return `Week ${index + 1} (${weekStartDate.toLocaleDateString()})`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Weekly Completions',
        data: weeklyCounts,
        fill: false,
        borderColor: '#4f46e5',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category' as const,
        labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Streak Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default StreakTrendsChart;
