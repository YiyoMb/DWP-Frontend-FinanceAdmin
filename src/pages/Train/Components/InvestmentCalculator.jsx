import React, { useState } from "react";

const InvestmentCalculator = () => {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [futureValue, setFutureValue] = useState(null);

    const calculateInvestment = (e) => {
        e.preventDefault();
        if (!amount || !rate || !years) return;

        const principal = parseFloat(amount);
        const interestRate = parseFloat(rate) / 100;
        const time = parseFloat(years);

        // Fórmula de interés compuesto: FV = P(1 + r)^t
        const fv = principal * Math.pow(1 + interestRate, time);
        setFutureValue(fv.toFixed(2));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculadora de Inversiones</h2>
            <form onSubmit={calculateInvestment}>
                <div className="mb-4">
                    <label className="block text-gray-600">Monto inicial ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Ej. 1000"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Tasa de interés anual (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Ej. 5"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Número de años</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Ej. 10"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                    Calcular
                </button>
            </form>

            {futureValue && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">Valor futuro estimado:</h3>
                    <p className="text-green-600 text-xl font-bold">${futureValue}</p>
                </div>
            )}
        </div>
    );
};

export default InvestmentCalculator;
