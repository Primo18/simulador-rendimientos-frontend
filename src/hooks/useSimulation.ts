import { useState } from 'react';
import { simulationService } from '../services/simulationService';
import { SimulationResult } from '../types/SimulationResult';

export const useSimulation = () => {
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const simulate = async (params: { bankId: number; principal: number; years: number }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await simulationService.simulateSavings(params);
            setResult(response);
        } catch (err) {
            setError(`Error al simular: ${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSimulation = () => {
        setResult(null);
        setError(null);
    };

    return { result, error, isLoading, simulate, resetSimulation };
};