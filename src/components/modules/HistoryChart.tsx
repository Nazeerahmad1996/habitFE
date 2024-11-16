import { Habit } from '@/types/habit';
import { Doughnut } from 'react-chartjs-2';

interface HistoryViewProps {
    habit: Habit;
}

const HistoryChart: React.FC<HistoryViewProps> = ({ habit }) => {
    function calculateStreak(createdAt: Date) {
        const createdDate: any = new Date(createdAt);
        const today: any = new Date();

        createdDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime: any = today - createdDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= 0 ? diffDays + 1 : 0;
    }
    
    const daysCount = habit.createdAt ? calculateStreak(habit.createdAt) : 0;
    const data = {
        labels: [
            'Complete Score',
            'Uncompleted Score',
        ],
        datasets: [{
            label: habit.title,
            data: [habit.streak, daysCount - habit.streak],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(240, 240, 240)'
            ],
            hoverOffset: 4
        }]
    };
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <div>
            <p className="font-medium">{habit.title}</p>
            <div style={{ width: '130px', height: '130px' }} className='flex-col'>
                <Doughnut data={data} options={options} width={120} height={120} />
            </div>
            <div>
                <p className="font-light text-xs">Total Days: {daysCount}</p>
                <p className="font-light text-xs">Total Streaks: {habit.streak}</p>
            </div>
        </div>
    )
};

export default HistoryChart;