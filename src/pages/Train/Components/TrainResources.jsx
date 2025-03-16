import React from "react";

const TrainResources = () => {
    const resources = [
        { title: "Curso de Finanzas Personales", url: "https://www.coursera.org" },
        { title: "Libro: Padre Rico, Padre Pobre", url: "https://www.amazon.com" },
        { title: "Blog de Finanzas", url: "https://www.investopedia.com" },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recursos Recomendados</h2>
            <ul className="divide-y divide-gray-200">
                {resources.map((resource, index) => (
                    <li key={index} className="py-2">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {resource.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainResources;
