import React from "react";

const GoalVisualization = () => {
    const goals = [
        { name: "Fondo de Emergencia", progress: 60 },
        { name: "Viaje a Europa", progress: 30 },
        { name: "Enganche para una casa", progress: 10 },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Visualización de Metas Financieras</h2>
            {goals.map((goal, index) => (
                <div key={index} className="mb-4">
                    <p className="text-gray-700">{goal.name}</p>
                    <div className="w-full bg-gray-300 h-4 rounded-lg overflow-hidden mt-1">
                        <div
                            className="h-full bg-blue-500"
                            style={{ width: `${goal.progress}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GoalVisualization;
