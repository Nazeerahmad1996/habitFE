// app/dashboard/page.tsx
import AddTemplate from '@/components/templates/AddTemplate';

const HabitsPage = async () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <AddTemplate />
    </div>
  );
};

export default HabitsPage;
