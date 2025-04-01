import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import GoalForm from "./Components/GoalForm";
import GoalList from "./Components/GoalList";

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ show: false, type: "", message: "" });

    // Cargar metas al montar el componente
    useEffect(() => {
        fetchGoals();
    }, []);

    // Función para mostrar notificaciones
    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            setNotification({ show: false, type: "", message: "" });
        }, 5000);
    };

    // Obtener todas las metas del usuario
    const fetchGoals = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            console.log("Enviando token:", token); // Para depuración

            const response = await fetch(`${process.env.REACT_APP_API_URL}/goals`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("Status de respuesta:", response.status); // Para depuración

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data); // Para depuración

            setGoals(data.data);
            setError(null);
        } catch (err) {
            console.error('Error al cargar las metas:', err);
            setError(err.message || 'Error al cargar las metas');
        } finally {
            setLoading(false);
        }
    };

    // Agregar una nueva meta
    const addGoal = async (goalData) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/goals`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(goalData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setGoals([...goals, data.data]);
            showNotification("success", "Meta creada exitosamente");
            return data; // Retornar los datos para manejarlos en el componente que llama
        } catch (err) {
            console.error('Error al crear la meta:', err);
            setError(err.message || 'Error al crear la meta');
            showNotification("error", `Error al crear la meta: ${err.message}`);
            throw err; // Re-lanzar el error para manejarlo en el componente que llama
        } finally {
            setLoading(false);
        }
    };

    // Eliminar una meta
    const deleteGoal = async (goalId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            setGoals(goals.filter(goal => goal._id !== goalId));
            showNotification("success", "Meta eliminada exitosamente");
        } catch (err) {
            console.error('Error al eliminar la meta:', err);
            showNotification("error", `Error al eliminar la meta: ${err.message}`);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar el progreso de una meta
    const updateGoalProgress = async (goalId, currentAmount) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/goals/${goalId}/progress`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentAmount })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setGoals(goals.map(goal =>
                goal._id === goalId ? data.data : goal
            ));
            showNotification("success", "Progreso actualizado exitosamente");
        } catch (err) {
            console.error('Error al actualizar el progreso:', err);
            showNotification("error", `Error al actualizar el progreso: ${err.message}`);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Componente de notificación
    const Notification = () => {
        if (!notification.show) return null;

        const bgColor = notification.type === "success" ? "bg-green-100 border-green-500 text-green-700" :
            "bg-red-100 border-red-500 text-red-700";

        return (
            <div className={`fixed top-4 right-4 px-4 py-3 rounded-md border ${bgColor} shadow-md transition-all duration-300 z-50`}>
                <div className="flex items-center">
                    <div className="py-1">
                        {notification.type === "success" ? (
                            <svg className="h-6 w-6 text-green-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="font-bold">{notification.type === "success" ? "Éxito" : "Error"}</p>
                        <p className="text-sm">{notification.message}</p>
                    </div>
                    <button
                        onClick={() => setNotification({ show: false, type: "", message: "" })}
                        className="ml-auto pl-3"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f8]">
            {/* Notificación */}
            <Notification />

            {/* Header y Navbar en la misma fila */}
            <div className="flex items-center bg-[#f5f5f8] py-8 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Header />
                    <div className="flex-grow flex justify-center">
                        <Navbar />
                    </div>
                </div>
            </div>

            {/* Contenido principal de Goals */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold text-[#17211f]">Metas Financieras</h1>
                <p className="text-[#17211f] mt-2">Define tus objetivos financieros y haz seguimiento.</p>

                {/* Mensaje de error si existe */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                        {error}
                    </div>
                )}

                {/* Componentes de Goals */}
                <div className="mt-6">
                    <GoalForm addGoal={addGoal} />
                    {loading ? (
                        <div className="text-center py-4">Cargando...</div>
                    ) : (
                        <GoalList
                            goals={goals}
                            deleteGoal={deleteGoal}
                            updateGoalProgress={updateGoalProgress}
                        />
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Goals;