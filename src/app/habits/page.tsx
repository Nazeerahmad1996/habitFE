// app/dashboard/page.tsx
import HabitTemplate from '@/components/templates/HabitTemplate';
import { Habit } from '@/types/habit';

async function fetchHabits(): Promise<Habit[]> {
  const res = await fetch('http://localhost:4000/habits');
  if (!res.ok) {
    throw new Error('Failed to fetch habits');
  }
  return res.json();
}

const HabitsPage = async () => {
  const habits = await fetchHabits();
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <HabitTemplate initialHabits={habits} />
    </div>
  );
};

export default HabitsPage;
