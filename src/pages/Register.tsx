import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Rol por defecto
    const { register, isLoading, error, success } = useRegister();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(username, password, role);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    <FontAwesomeIcon icon={['fas', 'user-plus']} className="mr-2" />
                    Registro de Usuario
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            className="select select-bordered w-full"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="USER">Usuario</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>
                {success && (
                    <p className="mt-4 text-green-600">¡Usuario registrado exitosamente! <NavLink to="/login" className="text-blue-500 underline">Inicia sesión aquí</NavLink>.</p>
                )}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};
