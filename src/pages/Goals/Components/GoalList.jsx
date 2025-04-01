import React, { useState } from "react";

const GoalList = ({ goals, deleteGoal, updateGoalProgress }) => {
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newAmount, setNewAmount] = useState("");

    // Abrir modal de confirmación de eliminación
    const handleDeleteClick = (goal) => {
        setSelectedGoal(goal);
        setShowDeleteModal(true);
    };

    // Confirmar eliminación de meta
    const confirmDelete = async () => {
        try {
            await deleteGoal(selectedGoal._id);
            setShowDeleteModal(false);
            setSelectedGoal(null);
        } catch (error) {
            console.error("Error al eliminar la meta:", error);
        }
    };

    // Abrir modal para actualizar progreso
    const handleUpdateClick = (goal) => {
        setSelectedGoal(goal);
        setNewAmount(goal.currentAmount || 0);
        setShowUpdateModal(true);
    };

    // Confirmar actualización de progreso
    const confirmUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateGoalProgress(selectedGoal._id, Number(newAmount));
            setShowUpdateModal(false);
            setSelectedGoal(null);
        } catch (error) {
            console.error("Error al actualizar el progreso:", error);
        }
    };

    // Calcular porcentaje de progreso
    const calculateProgress = (goal) => {
        if (!goal.currentAmount || goal.currentAmount === 0) return 0;
        const percentage = (goal.currentAmount / goal.amount) * 100;
        return Math.min(percentage, 100).toFixed(1);
    };

    // Modal de confirmación para eliminar
    const DeleteConfirmationModal = () => {
        if (!showDeleteModal) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
                        <p className="text-gray-600">
                            ¿Estás seguro que deseas eliminar la meta "{selectedGoal?.description}"?
                            Esta acción no se puede deshacer.
                        </p>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            onClick={confirmDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Modal para actualizar progreso
    const UpdateProgressModal = () => {
        if (!showUpdateModal) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Actualizar progreso</h3>
                        <p className="text-gray-600 mb-4">
                            Actualiza el progreso de tu meta "{selectedGoal?.description}".
                        </p>
                        <form onSubmit={confirmUpdate}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentAmount">
                                    Monto actual
                                </label>
                                <input
                                    id="currentAmount"
                                    type="text"
                                    pattern="^\d+$"
                                    min="0"
                                    max={selectedGoal?.amount}
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                    onClick={() => setShowUpdateModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Mis Metas</h2>

            {/* Modales */}
            <DeleteConfirmationModal />
            <UpdateProgressModal />

            {goals.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aún no has creado ninguna meta financiera.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map((goal) => (
                        <div key={goal._id} className="bg-white rounded-lg shadow-md p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-lg">{goal.description || "Meta sin descripción"}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleUpdateClick(goal)}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="Actualizar progreso"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(goal)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Eliminar meta"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="text-gray-700">
                                    <span className="font-medium">Objetivo:</span> ${goal.amount.toLocaleString()}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Plazo:</span> {goal.duration} {goal.duration === 1 ? 'mes' : 'meses'}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Actual:</span> ${(goal.currentAmount || 0).toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-blue-700">Progreso</span>
                                    <span className="text-sm font-medium text-blue-700">{calculateProgress(goal)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${calculateProgress(goal)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoalList;