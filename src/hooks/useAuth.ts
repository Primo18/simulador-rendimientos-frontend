import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Indeterminado al principio

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Autenticado si existe un token
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return { isAuthenticated, logout };
};
