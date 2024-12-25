import { useState } from 'react';
import { useBanks } from '../hooks/useBanks';
import { bankService } from '../services/bankService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from './Modal';

export const BankManagement = () => {
    const { banks, isLoading, error, refreshBanks } = useBanks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBank, setEditingBank] = useState<{ id?: number; name: string; address: string; contact: string } | null>(null);

    const handleSave = async () => {
        if (!editingBank) return;

        try {
            if (editingBank.id) {
                await bankService.updateBank(editingBank.id, editingBank);
            } else {
                await bankService.createBank(editingBank);
            }
            setIsModalOpen(false);
            refreshBanks();
        } catch (err) {
            console.error('Error al guardar:', err);
        }
    };

    const handleDelete = async (bankId: number) => {
        try {
            await bankService.deleteBank(bankId);
            refreshBanks();
        } catch (err) {
            console.error('Error al eliminar:', err);
        }
    };

    return (
        <div className="text-gray-900">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Bancos</h2>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm mb-4 flex items-center"
                onClick={() => {
                    setEditingBank({ name: '', address: '', contact: '' });
                    setIsModalOpen(true);
                }}
            >
                <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                Agregar Banco
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {banks.map((bank, index) => (
                                <tr key={bank.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bank.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bank.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bank.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingBank(bank);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 flex items-center"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'edit']} className="mr-1" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(bank.id)}
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
                title={editingBank?.id ? 'Editar Banco' : 'Agregar Banco'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className="bg-white p-6 rounded-lg">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                value={editingBank?.name || ''}
                                onChange={(e) => setEditingBank({ ...editingBank!, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                value={editingBank?.address || ''}
                                onChange={(e) => setEditingBank({ ...editingBank!, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                value={editingBank?.contact || ''}
                                onChange={(e) => setEditingBank({ ...editingBank!, contact: e.target.value })}
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