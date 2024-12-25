import { useState, useEffect, useCallback } from 'react';
import { rateService } from '../services/rateService';
import { Rate } from '../types/Rate';

export const useRates = () => {
    const [rates, setRates] = useState<Rate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRates = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await rateService.getRates();
            setRates(data);
        } catch (err) {
            setError(`Error al cargar las tasas: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    return { rates, isLoading, error, refreshRates: fetchRates };
};