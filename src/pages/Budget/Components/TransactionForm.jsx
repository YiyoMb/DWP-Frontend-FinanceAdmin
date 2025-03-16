import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
    const [type, setType] = useState("income"); // "income" o "expense"
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !amount) return;

        addTransaction({ type, category, amount: parseFloat(amount) });
        setCategory("");
        setAmount("");
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Agregar Transacción</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-600">Tipo</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                    >
                        <option value="income">Ingreso</option>
                        <option value="expense">Gasto</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Categoría</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Ej. Comida, Transporte, Sueldo"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Monto</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Ingrese el monto"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
