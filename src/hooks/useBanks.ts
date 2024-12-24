import { useState, useEffect } from 'react';
import { bankService } from '../services/bankService';
import { Bank } from '../types/Bank'; // Asegúrate de importar correctamente

export const useBanks = () => {
    const [banks, setBanks] = useState<Bank[]>([]); // Tipar explícitamente como un array de Bank
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBanks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data: Bank[] = await bankService.getBanks(); // Esperar que `getBanks` devuelva un array de Bank
                setBanks(data);
            } catch (err) {
                setError(`Error al cargar la lista de bancos. ${err}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanks();
    }, []);

    return { banks, isLoading, error };
};
