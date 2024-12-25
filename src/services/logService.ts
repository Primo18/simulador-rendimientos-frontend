import { apiFetch } from './api';

export const logService = {
    getLogs: async () => apiFetch('/logs'),
};
