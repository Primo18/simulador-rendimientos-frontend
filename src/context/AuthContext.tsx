import { createContext } from 'react';

export interface AuthContextProps {
    isAuthenticated: boolean;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
