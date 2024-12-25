import { useLogs } from '../hooks/useLogs';

export const LogManagement = () => {
    const { logs, isLoading, error } = useLogs();

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Logs de Cambios</h2>

            {isLoading ? (
                <p className="text-gray-600">Cargando logs...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log, index) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{log.userId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(log.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <details>
                                            <summary className="cursor-pointer text-blue-600">Ver detalles</summary>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-700">
                                                    <strong>Datos anteriores:</strong> {log.previousData || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <strong>Datos nuevos:</strong> {log.newData || 'N/A'}
                                                </p>
                                            </div>
                                        </details>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
