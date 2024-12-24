import { apiFetch } from './api';

export const authService = {
    login: async (username: string, password: string): Promise<string> => {
        const response = await apiFetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        return response.token; // Asegúrate de que el backend devuelve un objeto con `token`
    },
    register: async (username: string, password: string, role?: string): Promise<void> =>
        apiFetch('/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, password, role }),
        }),
};
