import { useState } from 'react';
import { BankManagement } from '../components/BankManagement';
import { RateManagement } from '../components/RateManagement';
import { LogManagement } from '../components/LogManagement'; // Nuevo componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Admin = () => {
    const [activeTab, setActiveTab] = useState<'banks' | 'rates' | 'logs'>('banks');

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex space-x-4">
                        <button
                            className={`py-3 px-6 text-sm font-medium rounded-t-lg transition-colors duration-200 
                            ${activeTab === 'banks'
                                    ? 'bg-gray-100 text-gray-900 border-b-2 border-blue-500'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('banks')}
                        >
                            <FontAwesomeIcon icon={['fas', 'university']} className="mr-2" />
                            Gestión de Bancos
                        </button>
                        <button
                            className={`py-3 px-6 text-sm font-medium rounded-t-lg transition-colors duration-200
                            ${activeTab === 'rates'
                                    ? 'bg-gray-100 text-gray-900 border-b-2 border-blue-500'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('rates')}
                        >
                            <FontAwesomeIcon icon={['fas', 'percentage']} className="mr-2" />
                            Gestión de Tasas
                        </button>
                        <button
                            className={`py-3 px-6 text-sm font-medium rounded-t-lg transition-colors duration-200
                            ${activeTab === 'logs'
                                    ? 'bg-gray-100 text-gray-900 border-b-2 border-blue-500'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('logs')}
                        >
                            <FontAwesomeIcon icon={['fas', 'clipboard-list']} className="mr-2" />
                            Logs
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="text-gray-900">
                    {activeTab === 'banks' && <BankManagement />}
                    {activeTab === 'rates' && <RateManagement />}
                    {activeTab === 'logs' && <LogManagement />}
                </div>
            </div>
        </div>
    );
};
