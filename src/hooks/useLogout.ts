import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';

export const useLogout = () => {
    const navigate = useNavigate();
    const { logout: authLogout } = useAuth();

    const logout = () => {
        authLogout();
        navigate('/login');
    };

    return { logout };
};