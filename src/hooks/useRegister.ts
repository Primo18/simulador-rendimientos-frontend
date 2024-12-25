import { useState } from 'react';
import { authService } from '../services/authService';

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const register = async (username: string, password: string, role?: string) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await authService.register(username, password, role);
            setSuccess(true); // Indica que el registro fue exitoso
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading, error, success };
};
