import { useNavigate } from 'react-router';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
    };

    return { logout };
};
