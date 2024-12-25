import { useState } from 'react';
import { useAuth } from './useAuth';
import { authService } from '../services/authService';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login: authLogin } = useAuth();

    const login = async (username: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const token = await authService.login(username, password);
            authLogin(token);
        } catch (err) {
            setError(`Usuario o contraseña incorrectos. ${err}`);
            localStorage.removeItem('token');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};