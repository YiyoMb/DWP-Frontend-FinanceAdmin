import { useState } from "react";

const GoalItem = ({ goal, deleteGoal, updateGoalProgress }) => {
    const [currentAmount, setCurrentAmount] = useState(goal.currentAmount || 0);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Calcular el porcentaje de progreso
    const progress = goal.currentAmount ? (goal.currentAmount / goal.amount) * 100 : 0;

    // Calcular la fecha objetivo
    const targetDate = new Date(goal.targetDate || Date.now());
    const formattedDate = targetDate.toLocaleDateString();

    // Calcular el monto mensual recomendado
    const monthlyAmount = goal.amount / goal.duration;

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta meta?')) {
            try {
                setIsLoading(true);
                await deleteGoal(goal._id);
            } catch (error) {
                console.error("Error al eliminar la meta:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleProgressUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateGoalProgress(goal._id, currentAmount);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar el progreso:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-[#17211f]">
                        {goal.description || `Meta: $${goal.amount.toLocaleString()}`}
                    </h3>
                    <p className="text-gray-600">Objetivo: ${goal.amount.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isEditing ? 'Cancelar' : 'Actualizar'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        disabled={isLoading}
                    >
                        Eliminar
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">Plazo: {goal.duration} meses (hasta {formattedDate})</p>
                <p className="text-gray-600">Ahorro mensual recomendado: ${monthlyAmount.toFixed(2)}</p>
            </div>

            {isEditing ? (
                <form onSubmit={handleProgressUpdate} className="mb-4">
                    <label className="block text-sm font-medium mb-1">Actualizar progreso actual:</label>
                    <div className="flex">
                        <input
                            type="number"
                            value={currentAmount}
                            onChange={(e) => setCurrentAmount(e.target.value)}
                            className="flex-1 p-2 border rounded-l-md"
                            min="0"
                            max={goal.amount}
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
                            disabled={isLoading}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span>Progreso: ${goal.currentAmount?.toLocaleString() || 0} de ${goal.amount.toLocaleString()}</span>
                        <span>{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progress > 100 ? 100 : progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalItem;