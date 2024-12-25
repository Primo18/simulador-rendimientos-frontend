import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

type Role = 'ADMIN' | 'USER'; // Define roles específicos

interface ProtectedRouteProps {
    allowedRoles: Role[];
    redirectPath?: string;
}

export const ProtectedRoute = ({
    allowedRoles,
    redirectPath = '/login'
}: ProtectedRouteProps) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    if (!role || !allowedRoles.includes(role as Role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};