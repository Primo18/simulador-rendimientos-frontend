import { NavLink } from "react-router";

export const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    Bienvenido al Simulador de Rendimientos
                </h1>
                <p className="text-gray-600 mb-6">
                    Selecciona un banco, ingresa el monto y el plazo para calcular el rendimiento de tus
                    ahorros.
                </p>
                <NavLink
                    to="/simulate"
                    className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition"
                >
                    Simular Ahora
                </NavLink>
            </div>
        </div>
    );
};
