import { apiFetch } from './api';

export const rateService = {
    getRates: async () => apiFetch('/interest-rates'),
    getRate: async (id: number) => apiFetch(`/interest-rates/${id}`),
    createRate: async (rate: { bankId: number; annualPercentage: number }) =>
        apiFetch('/interest-rates', { method: 'POST', body: JSON.stringify(rate) }),
    updateRate: async (id: number, updates: Partial<{ annualPercentage: number }>) =>
        apiFetch(`/interest-rates/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    deleteRate: async (id: number) => apiFetch(`/interest-rates/${id}`, { method: 'DELETE' }),
};
