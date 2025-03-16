import React, { useState } from "react";

const HabitTracker = () => {
    const [habits, setHabits] = useState([
        { id: 1, name: "Ahorrar $50 semanalmente", completed: false },
        { id: 2, name: "Evitar compras impulsivas", completed: true },
    ]);

    const toggleCompletion = (id) => {
        setHabits(
            habits.map((habit) =>
                habit.id === id ? { ...habit, completed: !habit.completed } : habit
            )
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Seguimiento de Hábitos Financieros</h2>
            <ul>
                {habits.map((habit) => (
                    <li key={habit.id} className="flex items-center justify-between mb-2">
            <span className={`${habit.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
              {habit.name}
            </span>
                        <button
                            className={`px-3 py-1 text-sm rounded-lg ${
                                habit.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                            }`}
                            onClick={() => toggleCompletion(habit.id)}
                        >
                            {habit.completed ? "Completado" : "Pendiente"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HabitTracker;
