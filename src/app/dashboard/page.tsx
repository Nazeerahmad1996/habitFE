import DashboardTemplate from '@/components/templates/DashboardTemplate';
import { Habit } from '@/types/habit';
export const dynamic = "force-dynamic";


const DashboardPage = async () => {
  async function fetchHabits(): Promise<Habit[]> {
    const res = await fetch('http://localhost:4000/habits',{
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch habits');
    }
    return res.json();
  }
  const habits = await fetchHabits();
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <DashboardTemplate initialHabits={habits} />
    </div>
  );
};

export default DashboardPage;
