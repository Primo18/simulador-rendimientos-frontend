import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext, AuthContextProps } from './AuthContext';

interface DecodedToken {
    role: string;
    exp: number;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState({
        token: null as string | null,
        isAuthenticated: false,
        role: null as string | null,
    });

    const validateAndDecodeToken = (token: string) => {
        try {
            const decoded = jwtDecode<DecodedToken>(token);

            // Validar expiración
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new Error('Token expirado');
            }

            return decoded;
        } catch (error) {
            console.error('Error en validación del token:', error);
            return null;
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decoded = validateAndDecodeToken(storedToken);
            if (decoded) {
                setAuthState({
                    token: storedToken,
                    isAuthenticated: true,
                    role: decoded.role,
                });
            } else {
                logout();
            }
        }
    }, []);

    const login = (newToken: string) => {
        const decoded = validateAndDecodeToken(newToken);
        if (decoded) {
            localStorage.setItem('token', newToken);
            setAuthState({
                token: newToken,
                isAuthenticated: true,
                role: decoded.role,
            });
        } else {
            throw new Error('Token inválido');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            isAuthenticated: false,
            role: null,
        });
    };

    const value: AuthContextProps = {
        isAuthenticated: authState.isAuthenticated,
        role: authState.role,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};