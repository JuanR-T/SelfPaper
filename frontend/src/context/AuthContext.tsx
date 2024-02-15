import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Author, AuthContextType, LoginResponse } from '../types/types';
import { useLocalStorage } from '../lib/useLocalStorage';
import { decodeToken } from 'react-jwt';
import { handlePost } from '../api/handleCall';
import { useNavigate } from 'react-router-dom';
import toastProvider from '../lib/toastProvider';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [author, setAuthor] = useState<Author | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const { getItem, removeItem, setItem } = useLocalStorage();

    const getConfig = () => ({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getItem('token')}`,
        },
    });

    const logIn = async (email: string, password: string) => {
        try {
            const authResult = await handlePost<LoginResponse>(
                `${BASE_URL}/api/author/login`,
                {
                    email,
                    password,
                },
            );
            if (!authResult || !authResult.data?.token)
                throw new Error(authResult?.error);

            getAuthorFromToken(authResult.data?.token);
            setItem('token', authResult.data?.token);
            toastProvider(
                'success',
                'Connexion réussie !',
                'bottom-left',
                'light',
            );
            navigate('/dashboard');
        } catch (err) {
            toastProvider(
                'error',
                'Une erreur est survenue, réessaye de te connecter.',
                'bottom-left',
                'colored',
            );
        }
    };
    const signUp = async (
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string,
    ) => {
        try {
            const authresult = await handlePost<LoginResponse>(
                `${BASE_URL}/api/author/create`,
                {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                },
            );
            console.log('test', authresult);
            if (!authresult || !authresult.data?.token)
                throw new Error(authresult?.error);

            getAuthorFromToken(authresult.data?.token);
            setItem('token', authresult.data?.token);
            navigate('/dashboard');
            toastProvider(
                'success',
                'Connexion réussie !',
                'bottom-left',
                'light',
            );
        } catch (err) {
            toastProvider(
                'error',
                'Une erreur est survenue, réessaye de te connecter.',
                'bottom-left',
                'colored',
            );
        }
    };
    const logOut = () => {
        removeItem('token');
        setAuthor(undefined);
        navigate('/login');
        toastProvider(
            'success',
            'Déconnexion réussie !',
            'bottom-left',
            'light',
        );
    };
    const getAuthorFromToken = (token: string) => {
        if (!token) return logOut();

        const decodedToken: { author: Author } | null = decodeToken(token);
        if (!decodedToken?.author) return logOut();

        setAuthor(decodedToken?.author);
    };
    console.log("authoooor", author)
    useEffect(() => {
        const authorToken = getItem('token');

        if (authorToken) {
            getAuthorFromToken(authorToken);
        } else {
            setIsLoading(false);
            //TODO Find a solution to be able to go to signup page without doing this (it was commented)
            return logOut();
        }
        setIsLoading(false);
    }, []);

    const value: AuthContextType = {
        author,
        logIn,
        signUp,
        logOut,
        getConfig,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
