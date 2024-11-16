// src/components/organisms/HabitList.tsx
import HabitCard from '../modules/HabitCard';
import { Habit } from '@/types/habit';

interface HabitListProps {
  habits: Habit[];
  onArchive: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onArchive, onToggleComplete }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {habits.filter(habit => !habit.isArchived).map((habit) => (
      <HabitCard
        key={habit._id}
        habit={habit}
        onArchive={() => habit._id && onArchive(habit._id)}
        onToggleComplete={() => habit._id && onToggleComplete(habit._id)}
      />
    ))}
  </div>
);

export default HabitList;

