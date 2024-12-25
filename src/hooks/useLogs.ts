import { useEffect, useState } from 'react';
import { logService } from '../services/logService';

export interface Log {
    id: number;
    action: string;
    userId: number;
    previousData: string | null;
    newData: string | null;
    createdAt: string;
}

export const useLogs = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await logService.getLogs();
                setLogs(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return { logs, isLoading, error };
};
