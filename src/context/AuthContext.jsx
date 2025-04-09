import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verificar si hay un token al cargar la aplicación
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setLoading(false);
                    return;
                }

                // Configurar el token como predeterminado para todas las solicitudes
                axios.defaults.headers.common['x-auth-token'] = token;

                // Obtener información del usuario
                const res = await axios.get('/api/auth/user');

                setUser(res.data);
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Error al verificar autenticación:', err);
                localStorage.removeItem('token');
            }

            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post('/api/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            // Obtener información del usuario
            const userRes = await axios.get('/api/auth/user');

            setUser(userRes.data);
            setIsAuthenticated(true);

            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
            return false;
        }
    };

    // Función para registrar un usuario
    const register = async (userData) => {
        try {
            setError(null);
            const res = await axios.post('/api/auth/register', userData);

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            // Obtener información del usuario
            const userRes = await axios.get('/api/auth/user');

            setUser(userRes.data);
            setIsAuthenticated(true);

            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar el usuario');
            return false;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                error,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);