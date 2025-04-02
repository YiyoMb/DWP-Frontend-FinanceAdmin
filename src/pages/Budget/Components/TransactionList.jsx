import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TransactionList = ({ transactions, onDelete, loading }) => {
    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "d 'de' MMMM, yyyy", { locale: es });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de Transacciones</h2>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No hay transacciones registradas.</p>
                    <p className="text-gray-500 text-sm mt-2">
                        Comienza registrando tus ingresos y gastos usando el formulario.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha
                            </th>
                            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Monto
                            </th>
                            <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                            <tr key={transaction._id} className="hover:bg-gray-50">
                                <td className="py-3 px-3 text-sm text-gray-500">
                                    {formatDate(transaction.date)}
                                </td>
                                <td className="py-3 px-3 text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-10"
                                              style={{
                                                  backgroundColor: transaction.type === "income" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                                  color: transaction.type === "income" ? "#065f46" : "#b91c1c"
                                              }}>
                                            {transaction.category}
                                        </span>
                                </td>
                                <td className="py-3 px-3 text-sm text-gray-500">
                                    {transaction.description || "—"}
                                </td>
                                <td className={`py-3 px-3 text-sm font-medium text-right ${
                                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                                }`}>
                                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                                </td>
                                <td className="py-3 px-3 text-sm text-gray-500 text-right">
                                    <button
                                        onClick={() => onDelete(transaction._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Eliminar transacción"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionList;