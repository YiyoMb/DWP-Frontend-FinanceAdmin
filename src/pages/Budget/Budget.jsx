import React, { useState, useEffect, useCallback } from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import BudgetChart from "./Components/BudgetChart";

const Budget = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para cargar las transacciones desde el backend con fetch
    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error("No se pudieron cargar las transacciones");
            }
            const data = await response.json();
            setTransactions(data.data);
            setError(null);
        } catch (err) {
            console.error("Error al cargar las transacciones:", err);
            setError("No se pudieron cargar las transacciones. Por favor, intenta de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar las transacciones al montar el componente
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Manejar la adición de una nueva transacción
    const handleTransactionAdded = (newTransaction) => {
        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    };

    // Manejar la eliminación de una transacción
    const handleDeleteTransaction = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error("Error al eliminar la transacción");
                }
                setTransactions(prevTransactions =>
                    prevTransactions.filter(transaction => transaction._id !== id)
                );
                alert('Transacción eliminada correctamente');
            } catch (err) {
                console.error("Error al eliminar la transacción:", err);
                alert('Error al eliminar la transacción');
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f8]">
            {/* Header y Navbar en la misma fila */}
            <div className="flex items-center bg-[#f5f5f8] py-8 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Header />
                    <div className="flex-grow flex justify-center">
                        <Navbar />
                    </div>
                </div>
            </div>

            {/* Contenido principal de Budget */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold text-[#17211f]">Presupuesto</h1>
                <p className="text-[#17211f] mt-2">
                    Registra tus transacciones y visualiza tus ingresos y gastos.
                </p>

                {/* Mostrar error general si existe */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
                        {error}
                        <button
                            className="float-right text-red-700"
                            onClick={() => setError(null)}
                            aria-label="Cerrar"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {/* Componentes de Budget */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Formulario para agregar transacciones */}
                    <TransactionForm onTransactionAdded={handleTransactionAdded} />
                    {/* Gráfica de presupuesto */}
                    <BudgetChart />
                </div>

                {/* Lista de transacciones registradas */}
                <div className="mt-6">
                    <TransactionList
                        transactions={transactions}
                        onDelete={handleDeleteTransaction}
                        loading={loading}
                    />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Budget;
