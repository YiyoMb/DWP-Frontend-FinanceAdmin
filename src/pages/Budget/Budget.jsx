import React, { useState } from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import BudgetChart from "./Components/BudgetChart";

const Budget = () => {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
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

                {/* Componentes de Budget */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Formulario para agregar transacciones */}
                    <TransactionForm addTransaction={addTransaction} />

                    {/* Gráfica de presupuesto */}
                    <BudgetChart transactions={transactions} />
                </div>

                {/* Lista de transacciones registradas */}
                <div className="mt-6">
                    <TransactionList transactions={transactions} />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Budget;
