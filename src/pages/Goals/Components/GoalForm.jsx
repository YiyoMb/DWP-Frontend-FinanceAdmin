import { useState } from "react";

const GoalForm = ({ addGoal }) => {
    const [goal, setGoal] = useState({
        amount: "",
        duration: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setGoal({ ...goal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!goal.amount || !goal.duration) return;

        try {
            setIsSubmitting(true);
            await addGoal(goal);
            setGoal({ amount: "", duration: "", description: "" });
        } catch (error) {
            console.error("Error al guardar la meta:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-[#17211f]">Crear Nueva Meta</h2>

            <div className="mb-4">
                <label className="block text-lg font-semibold mb-2 text-[#17211f]">Monto Objetivo:</label>
                <input
                    type="number"
                    name="amount"
                    value={goal.amount}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ejemplo: 10000"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-semibold mb-2 text-[#17211f]">Plazo (meses):</label>
                <input
                    type="number"
                    name="duration"
                    value={goal.duration}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ejemplo: 12"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-semibold mb-2 text-[#17211f]">Descripción (opcional):</label>
                <textarea
                    name="description"
                    value={goal.description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe tu meta financiera..."
                    rows="3"
                />
            </div>

            <button
                type="submit"
                className="w-full mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Guardando...' : 'Guardar Meta'}
            </button>
        </form>
    );
};

export default GoalForm;