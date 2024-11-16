// src/types/habit.ts
export interface Habit {
  _id?: string;
  title: string;
  description: string;
  streak: number;
  completedDates: Date[];
  isArchived: boolean;
  goal: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  createdAt?: Date;
}
