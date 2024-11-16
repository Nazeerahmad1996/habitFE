'use client';

import React from 'react';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  onArchive: () => void;
  onToggleComplete: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onArchive, onToggleComplete }) => {
  const today = new Date().toISOString().split('T')[0];

  const completedDatesFormatted = habit.completedDates.map(date => new Date(date).toISOString().split('T')[0]);

  const status = completedDatesFormatted.includes(today) ? 'Completed' : 'Mark Complete';
  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{habit.title}</h3>
        <p className="text-gray-600">{habit.description}</p>
        <p className="text-sm text-green-600">Streak: {habit.streak}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded text-white ${status === 'Completed' ? 'bg-green-500' : 'bg-gray-400'
            }`}
        >
          {status}
        </button>
        <button onClick={onArchive} className="px-4 py-2 bg-red-500 text-white rounded">
          Archive
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
