import { Habit } from '@/types/habit';
import HistoryChart from '../modules/HistoryChart';

interface HistoryViewProps {
  history: Habit[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  return(
    <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-2">
      {history.map((habit) => (
        <div key={habit._id} className="flex items-center justify-between bg-white rounded-md shadow-md p-4">
          <HistoryChart habit={habit} />
        </div>
      ))}
    </div>
  )
};

export default HistoryView;