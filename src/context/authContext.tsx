import { createContext } from 'react';
import { User } from '../types/User';

interface AuthContextValue {
    user: User | null;
}

const authContextDefaultValues: AuthContextValue = {
    user: null,
}

const AuthContext = createContext<AuthContextValue>(authContextDefaultValues);

export default AuthContext;