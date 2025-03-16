import React from "react";

const TransactionList = ({ transactions }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de Transacciones</h2>
            <ul className="divide-y divide-gray-200">
                {transactions.length === 0 ? (
                    <p className="text-gray-600">No hay transacciones registradas.</p>
                ) : (
                    transactions.map((transaction, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <span className="text-gray-700">{transaction.category}</span>
                            <span
                                className={`font-semibold ${
                                    transaction.type === "income" ? "text-green-500" : "text-red-500"
                                }`}
                            >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TransactionList;
