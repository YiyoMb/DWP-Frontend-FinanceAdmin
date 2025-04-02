import React, { useState, useEffect } from "react";

const TransactionForm = ({ onTransactionAdded }) => {
    const [type, setType] = useState("income");
    const [categoryName, setCategoryName] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);

    // Crear nueva categoría si no existe
    const createCategoryIfNotExists = async (categoryName, categoryType) => {
        try {
            const token = localStorage.getItem('token');

            // Verificar si la categoría ya existe
            const existingCategory = categories.find(
                cat => cat.name.toLowerCase() === categoryName.toLowerCase() && cat.type === categoryType
            );

            if (existingCategory) {
                return existingCategory._id;
            }

            // Si no existe, crear nueva categoría
            setIsCreatingCategory(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: categoryName,
                    type: categoryType,
                    icon: 'circle', // Icono por defecto
                    color: '#808080' // Color por defecto
                })
            });

            if (!response.ok) {
                throw new Error("Error al crear categoría");
            }

            const data = await response.json();
            setCategories(prev => [...prev, data.data]);
            return data.data._id;
        } catch (err) {
            console.error("Error al crear categoría:", err);
            throw err;
        } finally {
            setIsCreatingCategory(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName || !amount) {
            setError("Por favor completa todos los campos obligatorios");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');

            // Primero asegurarnos de que la categoría exista
            const categoryId = await createCategoryIfNotExists(categoryName, type);

            // Luego crear la transacción
            const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type,
                    category: categoryName,
                    categoryId,
                    amount: parseFloat(amount),
                    description
                })
            });

            if (!response.ok) {
                throw new Error("Error al agregar la transacción");
            }

            const data = await response.json();
            onTransactionAdded(data.data);
            setCategoryName("");
            setAmount("");
            setDescription("");
        } catch (err) {
            setError(err.message || "Error al agregar la transacción");
            console.error("Error al agregar transacción:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Agregar Transacción</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-600">Tipo</label>
                    <div className="mt-1 flex">
                        <button
                            type="button"
                            className={`flex-1 p-2 rounded-l-lg ${
                                type === "income"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => setType("income")}
                        >
                            Ingreso
                        </button>
                        <button
                            type="button"
                            className={`flex-1 p-2 rounded-r-lg ${
                                type === "expense"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => setType("expense")}
                        >
                            Gasto
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Categoría</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Comida, Transporte, Salario..."
                    />
                    {isCreatingCategory && (
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500 mr-2"></div>
                            Creando categoría...
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Monto</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 pl-7 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Descripción (opcional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Añade detalles sobre esta transacción"
                        rows="3"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading || isCreatingCategory}
                    className={`w-full p-3 rounded-lg text-white font-medium 
                        ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
                        transition duration-200 ease-in-out`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            <span>Guardando...</span>
                        </div>
                    ) : (
                        "Guardar Transacción"
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;