import { useState } from 'react';
import { authService } from '../services/authService';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const token = await authService.login(username, password);
            localStorage.setItem('token', token); // Guardar token en localStorage
        } catch (err) {
            setError(`Usuario o contraseña incorrectos. ${err}`); // Mensaje de error personalizado
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
