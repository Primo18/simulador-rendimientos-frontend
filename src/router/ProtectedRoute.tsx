import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        // Mostrar un indicador de carga mientras se verifica el estado de autenticación
        return <div>Cargando...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
