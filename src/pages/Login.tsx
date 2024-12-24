import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
        if (!error) navigate('/'); // Redirigir si no hay error
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="card w-full max-w-md bg-white shadow-2xl p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700">Usuario</span>
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input input-bordered w-full bg-gray-700"
                            placeholder="Ingresa tu usuario"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700">Contraseña</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full bg-gray-700"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};
