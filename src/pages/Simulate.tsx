import { useSimulation } from '../hooks/useSimulation';
import { SimulationForm } from '../components/SimulationForm';
import { useBanks } from '../hooks/useBanks';

export const Simulate = () => {
    const { result, error, isLoading, simulate } = useSimulation();
    const { banks } = useBanks(); // Obtener la lista de bancos

    // Función para obtener el nombre del banco
    const getBankName = (bankId: number) => {
        const bank = banks.find((b) => b.id === bankId);
        return bank ? bank.name : 'Banco desconocido';
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="card w-full max-w-lg bg-white shadow-2xl p-8 rounded-lg">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Simulación de Rendimientos</h2>
                    <p className="text-gray-600">Calcula cuánto puedes ganar con tus ahorros.</p>
                </div>
                <SimulationForm onSubmit={simulate} isLoading={isLoading} />
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {result !== null && (
                    <div className="mt-6 bg-green-100 text-green-700 border-green-500 rounded-lg p-4">
                        <h3 className="text-lg font-semibold">Resultados de la Simulación</h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <strong>Banco:</strong> {getBankName(result.bankId)}
                            </li>
                            <li>
                                <strong>Monto Inicial:</strong> ${result.principal.toFixed(2)}
                            </li>
                            <li>
                                <strong>Plazo:</strong> {result.years} años
                            </li>
                            <li>
                                <strong>Tasa Anual:</strong> {result.annualPercentage.toFixed(2)}%
                            </li>
                            <li>
                                <strong>Intereses Generados:</strong> ${result.earnings.toFixed(2)}
                            </li>
                            <li>
                                <strong>Monto Final:</strong> ${result.finalAmount.toFixed(2)}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
