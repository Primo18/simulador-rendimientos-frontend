import { useState } from 'react';
import { useBanks } from '../hooks/useBanks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SimulationFormProps {
    onSubmit: (params: { bankId: number; principal: number; years: number }) => void;
    isLoading: boolean;
}

export const SimulationForm = ({ onSubmit, isLoading }: SimulationFormProps) => {
    const [bankId, setBankId] = useState('');
    const [principal, setPrincipal] = useState('');
    const [years, setYears] = useState('');
    const { banks, isLoading: isBanksLoading, error } = useBanks();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ bankId: parseInt(bankId, 10), principal: parseFloat(principal), years: parseInt(years, 10) });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Campo de Banco */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 font-medium">Banco</span>
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={['fas', 'university']} className="absolute left-3 top-3 text-gray-400" />
                    <select
                        value={bankId}
                        onChange={(e) => setBankId(e.target.value)}
                        className="select select-bordered pl-10 bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        disabled={isBanksLoading || !!error}
                    >
                        {isBanksLoading ? (
                            <option value="">Cargando bancos...</option>
                        ) : error ? (
                            <option value="">Error al cargar bancos</option>
                        ) : (
                            <>
                                <option value="">Selecciona un banco</option>
                                {banks.map((bank) => (
                                    <option key={bank.id} value={bank.id}>
                                        {bank.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* Campo de Monto */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 font-medium">Monto</span>
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={['fas', 'money-bill-wave']} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        className="input input-bordered pl-10 bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        placeholder="Ingresa el monto inicial"
                    />
                </div>
            </div>

            {/* Campo de Plazo */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-gray-800 font-medium">Plazo (años)</span>
                </label>
                <div className="relative">
                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="input input-bordered pl-10 bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        placeholder="Ingresa el plazo en años"
                    />
                </div>
            </div>

            {/* Botón de Envío */}
            <div className="form-control">
                <button
                    type="submit"
                    className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Calculando...' : 'Simular'}
                </button>
            </div>
        </form>
    );
};
