"use client";
import { useState } from 'react';
import HabitList from '../widgets/HabitList';
import { Habit } from '@/types/habit';
import SearchBar from '../modules/SearchBar';

interface DashboardTemplateProps {
    initialHabits: Habit[];
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ initialHabits }) => {
    const [habits, setHabits] = useState<Habit[]>(initialHabits);
    const [query, setQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('streak');

    const handleArchiveHabit = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:4000/habits/${id}/archive`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Failed to archive habit');
            }

            setHabits((prevHabits) =>
                prevHabits.map((habit) =>
                    habit._id === id ? { ...habit, isArchived: true } : habit
                )
            );
        } catch (error) {
            console.error('Error archiving habit:', error);
            alert('Failed to archive habit, please try again.');
        }
    };

    const handleToggleComplete = async (id: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const habit = habits.find(habit => habit._id === id);

        if (habit) {
            const lastCompletionDate = habit.completedDates.length > 0 ? new Date(habit.completedDates[habit.completedDates.length - 1]) : null;

            if (lastCompletionDate) {
                lastCompletionDate.setHours(0, 0, 0, 0);

                if (lastCompletionDate.getTime() === today.getTime()) {
                    alert('This habit has already been completed today.');
                    return;
                }
            }

            try {
                const response = await fetch(`http://localhost:4000/habits/${id}/complete`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: new Date()
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to toggle completion');
                }

                const newHabit = await response.json();

                setHabits((prevHabits) =>
                    prevHabits.map((habit) =>
                        habit._id === id
                            ? newHabit
                            : habit
                    )
                );
            } catch (error) {
                console.error('Error toggling completion:', error);
                alert('Failed to toggle completion, please try again.');
            }
        } else {
            alert('Habit not found in local state.');
        }
    };

    const handleSearchAndSort = async () => {
        try {
            const response = await fetch(`http://localhost:4000/habits/search?query=${encodeURIComponent(query)}&sortBy=${encodeURIComponent(sortBy)}`);
            if (!response.ok) {
                throw new Error('Failed to search and sort habits');
            }

            const results = await response.json();
            setHabits(results);
        } catch (error) {
            console.error('Error fetching habits:', error);
            alert('Failed to fetch habits, please try again.');
        }
    };

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        handleSearchAndSort();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <SearchBar
                    onSearchSubmit={() => handleSearchAndSort()}
                    onQueryChange={handleQueryChange}
                />
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                >
                    <option value="streak">Sort by Streak</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="creationDate">Sort by Creation Date</option>
                </select>
            </div>

            <h3 className="text-lg font-semibold">Today's Habits Status</h3>
            <div className="mt-4">
                <HabitList
                    habits={habits.filter(habit => !habit.isArchived)}
                    onArchive={handleArchiveHabit}
                    onToggleComplete={handleToggleComplete}
                />
            </div>
        </div>
    );
};

export default DashboardTemplate;
