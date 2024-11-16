import React from 'react';
import { Habit } from '@/types/habit';
import { Line } from 'react-chartjs-2';

interface WeeklyProgressChartProps {
  habits: Habit[];
}

// Showing only two weeks of data

const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ habits }) => {

  const today = new Date();
  const completedDates = habits.flatMap(habit => habit.completedDates).map(date => new Date(date));

  const startDate = new Date(Math.min(...completedDates.map(date => date.getTime())));

  const firstDayOfWeek = new Date(startDate);

  const weeks = Math.ceil((today.getTime() - firstDayOfWeek.getTime()) / (7 * 24 * 60 * 60 * 1000));

  const labels = [
    "Previous Week",
    "Current Week"
  ]

  const datasets = habits.map((habit) => {
    const weeklyCounts = Array(weeks).fill(0);

    habit.completedDates.forEach(date => {
      const weekIndex = Math.floor((new Date(date).getTime() - firstDayOfWeek.getTime()) / (7 * 24 * 60 * 60 * 1000));
      if (weekIndex >= 0 && weekIndex < weeks) {
        weeklyCounts[weekIndex]++;
      }
    });

    return {
      label: habit.title,
      data: weeklyCounts,
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    };
  });

  const data = {
    labels,
    datasets,
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold">Weekly Progress</h3>
      <Line data={data} />
    </div>
  );
};

export default WeeklyProgressChart;
