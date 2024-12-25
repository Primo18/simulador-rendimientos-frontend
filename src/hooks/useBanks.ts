import { useState, useEffect, useCallback } from 'react';
import { bankService } from '../services/bankService';
import { Bank } from '../types/Bank';

export const useBanks = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBanks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await bankService.getBanks();
            setBanks(data);
        } catch (err) {
            setError(`Error al cargar la lista de bancos. ${err}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBanks();
    }, [fetchBanks]);

    return { banks, isLoading, error, refreshBanks: fetchBanks };
};