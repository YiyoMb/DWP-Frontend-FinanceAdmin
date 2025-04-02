import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = {
    income: ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"],
    expense: ["#EF4444", "#F87171", "#FCA5A5", "#FECACA", "#FEE2E2"]
};

const BudgetChart = () => {
    const [summary, setSummary] = useState({
        incomeTotal: 0,
        expenseTotal: 0,
        balance: 0,
        expensesByCategory: [],
        incomesByCategory: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeChart, setActiveChart] = useState("overview"); // "overview", "incomes", "expenses"
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("No hay token de autenticación");
            }

            console.log("Obteniendo resumen financiero...");
            const apiUrl = `${process.env.REACT_APP_API_URL}/transactions/summary`;
            console.log("URL de la API:", apiUrl);

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            console.log("Respuesta de la API:", response.status);

            if (!response.ok) {
                throw new Error(`Error al cargar el resumen financiero: ${response.status}`);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);

            if (!data.success) {
                throw new Error(data.error || "Error desconocido al obtener datos");
            }

            setSummary(data.data);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            console.error("Error al obtener el resumen financiero:", err);
            setError(`No se pudo cargar el resumen financiero: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Datos para el gráfico de resumen
    const overviewData = [
        { name: "Ingresos", value: summary.incomeTotal || 0 },
        { name: "Gastos", value: summary.expenseTotal || 0 }
    ];

    // Procesar datos de categorías para los gráficos
    const processedIncomesByCategory = summary.incomesByCategory?.map(item => ({
        name: item._id || "Sin categoría",
        value: item.total || 0
    })) || [];

    const processedExpensesByCategory = summary.expensesByCategory?.map(item => ({
        name: item._id || "Sin categoría",
        value: item.total || 0
    })) || [];

    // Formato de números para tooltips
    const formatCurrency = (value) => {
        return `$${value.toFixed(2)}`;
    };

    // Renderizar el contenido según el estado de carga
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={fetchSummary}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Reintentar
                    </button>
                </div>
            );
        }

        return (
            <>
                {/* Tabs de navegación */}
                <div className="flex border-b mb-4">
                    <button
                        className={`py-2 px-4 ${activeChart === "overview" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
                        onClick={() => setActiveChart("overview")}
                    >
                        General
                    </button>
                    <button
                        className={`py-2 px-4 ${activeChart === "incomes" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
                        onClick={() => setActiveChart("incomes")}
                    >
                        Ingresos
                    </button>
                    <button
                        className={`py-2 px-4 ${activeChart === "expenses" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
                        onClick={() => setActiveChart("expenses")}
                    >
                        Gastos
                    </button>
                </div>

                {/* Resumen numérico */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Balance</p>
                        <p className={`text-lg font-semibold ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ${(summary.balance || 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Ingresos</p>
                        <p className="text-lg font-semibold text-green-600">${(summary.incomeTotal || 0).toFixed(2)}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Gastos</p>
                        <p className="text-lg font-semibold text-red-600">${(summary.expenseTotal || 0).toFixed(2)}</p>
                    </div>
                </div>

                {/* Gráficos según la pestaña activa */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        {activeChart === "overview" ? (
                            overviewData[0].value === 0 && overviewData[1].value === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">No hay datos para mostrar</p>
                                </div>
                            ) : (
                                <PieChart>
                                    <Pie
                                        data={overviewData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        <Cell key="income-cell" fill="#10B981" />
                                        <Cell key="expense-cell" fill="#EF4444" />
                                    </Pie>
                                    <Tooltip formatter={formatCurrency} />
                                    <Legend />
                                </PieChart>
                            )
                        ) : activeChart === "incomes" ? (
                            processedIncomesByCategory.length > 0 ? (
                                <BarChart
                                    data={processedIncomesByCategory}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                    <YAxis />
                                    <Tooltip formatter={formatCurrency} />
                                    <Bar dataKey="value" fill="#10B981" />
                                </BarChart>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">No hay datos de ingresos por categoría</p>
                                </div>
                            )
                        ) : (
                            processedExpensesByCategory.length > 0 ? (
                                <BarChart
                                    data={processedExpensesByCategory}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                                    <YAxis />
                                    <Tooltip formatter={formatCurrency} />
                                    <Bar dataKey="value" fill="#EF4444" />
                                </BarChart>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">No hay datos de gastos por categoría</p>
                                </div>
                            )
                        )}
                    </ResponsiveContainer>
                </div>

                {/* Información de actualización y botón de actualizar */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    {lastUpdated && (
                        <div>Última actualización: {lastUpdated}</div>
                    )}
                    <button
                        onClick={fetchSummary}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualizar
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen Financiero</h2>
            {renderContent()}
        </div>
    );
};

export default BudgetChart;