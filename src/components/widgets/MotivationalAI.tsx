"use client";

import { useEffect, useState, useMemo } from 'react';
import { Habit } from '@/types/habit';

async function fetchMessage(messages: string): Promise<string> {
    try {
        const response = await fetch(`http://localhost:4000/habits/message?query=${encodeURIComponent(messages)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch motivational message');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching message:', error);
        return ''
    }
}

interface DashboardTemplateProps {
    habits: Habit[];
}

const MotivationalAI: React.FC<DashboardTemplateProps> = ({ habits }) => {
    const [message, setMessage] = useState<string>();

    const motivationalMessages = useMemo(() => {
        return habits
            .map(habit => {
                const { title, goal, streak } = habit;
                return `Generate a motivational message for someone who has a streak of ${streak} in "${title}" and is aiming for the goal of "${goal}".`;
            })
            .join(' ');
    }, [habits]);

    useEffect(() => {
        const storedMessage = localStorage.getItem('motivationalMessage');
        const storedKey = localStorage.getItem('motivationalMessagesKey');

        if (storedMessage && storedKey === motivationalMessages) {
            setMessage(storedMessage);
        } else {
            const fetchAndSetMessage = async () => {
                const fetchedMessage = await fetchMessage(motivationalMessages);
                if (fetchedMessage) {
                    setMessage(fetchedMessage);
                    localStorage.setItem('motivationalMessage', fetchedMessage);
                    localStorage.setItem('motivationalMessagesKey', motivationalMessages);
                }
            };

            if (motivationalMessages) {
                fetchAndSetMessage();
            }
        }
    }, [motivationalMessages]);

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h3 className="text-lg font-semibold">Motivational Message</h3>
            {message ? (
                <p className="font-light text-xs">{message}</p>
            ) : (
                <p className="font-light text-md text-blue-600 animate-pulse">
                    Please wait... The AI is crafting your motivational message!
                </p>
            )}
        </div>
    );
};

export default MotivationalAI;
