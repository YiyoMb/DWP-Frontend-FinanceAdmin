import { useState } from "react";

const GoalForm = ({ addGoal }) => {
    const [goal, setGoal] = useState({ amount: "", duration: "" });

    const handleChange = (e) => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!goal.amount || !goal.duration) return;
        addGoal(goal);
        setGoal({ amount: "", duration: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
            <label className="block text-lg font-semibold">Monto:</label>
            <input
                type="number"
                name="amount"
                value={goal.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <label className="block mt-2 text-lg font-semibold">Plazo (meses):</label>
            <input
                type="number"
                name="duration"
                value={goal.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Guardar Meta
            </button>
        </form>
    );
};

export default GoalForm;
