// Obtener todas las transacciones
export const getTransactions = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) throw new Error('Error al obtener transacciones');

        const data = await response.json();
        return data.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener resumen financiero
export const getFinancialSummary = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/summary`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) throw new Error('Error al obtener resumen financiero');

        const data = await response.json();
        return data.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Agregar una nueva transacción
export const addTransaction = async (transactionData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionData),
        });

        if (!response.ok) throw new Error('Error al agregar transacción');

        const data = await response.json();
        return data.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar una transacción
export const deleteTransaction = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) throw new Error('Error al eliminar transacción');

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getTransactions,
    getFinancialSummary,
    addTransaction,
    deleteTransaction
};
