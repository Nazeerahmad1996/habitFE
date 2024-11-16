"use client";

import { useState, useCallback } from 'react';
import { Habit } from '@/types/habit';

const HabitForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const newHabit: Habit = {
      title,
      description,
      goal,
      streak: 0,
      priority: 'Medium',
      date: new Date().toISOString(),
      completedDates: [],
      isArchived: false,
    };

    try {
      const apiUrl = 'http://localhost:4000/habits';
      const method = 'POST';

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) {
        throw new Error('Failed to save habit');
      }

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);

      setTitle('');
      setDescription('');
      setGoal('');
    } catch (error) {
      console.error('Error saving habit:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  }, [title, description, goal, isSubmitting]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {showSuccessPopup && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
          <p>Habit added successfully!</p>
        </div>
      )}
      {showErrorPopup && (
        <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
          <p>Failed to save habit, please try again.</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Habit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter habit title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Goal</label>
            <input
              type="text"
              placeholder="Enter goal (e.g., '5 times per week')"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 rounded-md text-white font-semibold ${
              isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Habit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
