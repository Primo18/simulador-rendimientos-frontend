import { useState } from 'react';
import { useRates } from '../hooks/useRates';
import { useBanks } from '../hooks/useBanks';
import { rateService } from '../services/rateService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from './Modal';

type Rate = {
    id?: number;
    bankId: number;
    annualPercentage: number;
};

export const RateManagement = () => {
    const { banks } = useBanks();
    const { rates, isLoading, error, refreshRates } = useRates();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRate, setEditingRate] = useState<Rate | null>(null);

    const handleSave = async () => {
        if (!editingRate) return;

        try {
            const { id, annualPercentage } = editingRate;
            if (id) {
                await rateService.updateRate(id, { annualPercentage });
            } else {
                await rateService.createRate(editingRate);
            }
            setIsModalOpen(false);
            refreshRates();
        } catch (err) {
            console.error('Error al guardar:', err);
        }
    };

    const handleDelete = async (rateId: number) => {
        try {
            await rateService.deleteRate(rateId);
            refreshRates();
        } catch (err) {
            console.error('Error al eliminar:', err);
        }
    };

    const getBankName = (bankId: number) => {
        const bank = banks.find((b) => b.id === bankId);
        return bank ? bank.name : 'Banco desconocido';
    };

    return (
        <div className="text-gray-900">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Tasas</h2>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm mb-4 flex items-center"
                onClick={() => {
                    setEditingRate({ bankId: banks[0]?.id || 0, annualPercentage: 0 });
                    setIsModalOpen(true);
                }}
            >
                <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                Agregar Tasa
            </button>

            {isLoading ? (
                <p className="text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Anual (%)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rates.map((rate, index) => (
                                <tr key={rate.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getBankName(rate.bankId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rate.annualPercentage}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingRate(rate);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 flex items-center"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'edit']} className="mr-1" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rate.id!)}
                                            className="text-red-600 hover:text-red-900 flex items-center"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'trash']} className="mr-1" />
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal
                title={editingRate?.id ? 'Editar Tasa' : 'Agregar Tasa'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className="bg-white p-6 rounded-lg">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800">
                                {editingRate ? getBankName(editingRate.bankId) : 'Banco desconocido'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tasa Anual (%)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                value={editingRate?.annualPercentage || ''}
                                onChange={(e) =>
                                    setEditingRate({
                                        ...editingRate!,
                                        annualPercentage: Number(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
