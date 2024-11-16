import Image from "next/image";
import { Chart as ChartJS, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';
// Register necessary Chart.js components
ChartJS.register(BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

export default function Home() {
  return (
    <div>
       <h3 className="text-lg font-semibold">Habit Tracker</h3>
    </div>
  );
}
