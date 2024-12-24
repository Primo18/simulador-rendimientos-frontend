import { apiFetch } from './api';
import { Bank } from '../types/Bank';

export const bankService = {
    getBanks: async (): Promise<Bank[]> => apiFetch('/banks'),
    getBank: async (id: number): Promise<Bank> => apiFetch(`/banks/${id}`),
    createBank: async (bank: { name: string; address: string; contact: string }): Promise<Bank> =>
        apiFetch('/banks', { method: 'POST', body: JSON.stringify(bank) }),
    updateBank: async (
        id: number,
        updates: Partial<{ name: string; address: string; contact: string }>
    ): Promise<Bank> => apiFetch(`/banks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    deleteBank: async (id: number): Promise<void> => apiFetch(`/banks/${id}`, { method: 'DELETE' }),
};
