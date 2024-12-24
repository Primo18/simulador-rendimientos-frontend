import { apiFetch } from './api';
import { SimulationResult } from '../types/SimulationResult';

export const simulationService = {
  simulateSavings: async (
    params: { bankId: number; principal: number; years: number }
  ): Promise<SimulationResult> =>
    apiFetch('/simulation/simulate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
};
