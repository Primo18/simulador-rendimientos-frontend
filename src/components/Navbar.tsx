import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogout } from '../hooks/useLogout';

export const Navbar = () => {
    const token = localStorage.getItem('token'); // Verifica si el usuario está autenticado
    const { logout } = useLogout(); // Hook para cerrar sesión

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white transition';

    return (
        <div className="navbar bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <NavLink to="/" className="btn btn-ghost normal-case text-2xl text-blue-500">
                    <FontAwesomeIcon icon={['fas', 'chart-line']} className="mr-2" />
                    Simulador
                </NavLink>

                {/* Menú en pantallas grandes */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink to="/" className={linkClass}>
                            <FontAwesomeIcon icon={['fas', 'home']} className="mr-2" />
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/simulate" className={linkClass}>
                            <FontAwesomeIcon icon={['fas', 'calculator']} className="mr-2" />
                            Simular
                        </NavLink>
                    </li>
                    {token ? (
                        <>
                            <li>
                                <NavLink to="/admin" className={linkClass}>
                                    <FontAwesomeIcon icon={['fas', 'user-shield']} className="mr-2" />
                                    Administrador
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className={linkClass({ isActive: false })}
                                >
                                    <FontAwesomeIcon icon={['fas', 'sign-out-alt']} className="mr-2" />
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink to="/login" className={linkClass}>
                                <FontAwesomeIcon icon={['fas', 'sign-in-alt']} className="mr-2" />
                                Iniciar Sesión
                            </NavLink>
                        </li>
                    )}
                </ul>

                {/* Menú hamburguesa en pantallas pequeñas */}
                <div className="dropdown dropdown-end md:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <FontAwesomeIcon icon={['fas', 'bars']} className="h-6 w-6" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-800 rounded-box w-52 text-gray-300"
                    >
                        <li>
                            <NavLink to="/" className={linkClass}>
                                <FontAwesomeIcon icon={['fas', 'home']} className="mr-2" />
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/simulate" className={linkClass}>
                                <FontAwesomeIcon icon={['fas', 'calculator']} className="mr-2" />
                                Simular
                            </NavLink>
                        </li>
                        {token ? (
                            <>
                                <li>
                                    <NavLink to="/admin" className={linkClass}>
                                        <FontAwesomeIcon icon={['fas', 'user-shield']} className="mr-2" />
                                        Administrador
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="btn btn-error text-white hover:bg-red-600 transition"
                                    >
                                        <FontAwesomeIcon icon={['fas', 'sign-out-alt']} className="mr-2" />
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login" className={linkClass}>
                                    <FontAwesomeIcon icon={['fas', 'sign-in-alt']} className="mr-2" />
                                    Iniciar Sesión
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
