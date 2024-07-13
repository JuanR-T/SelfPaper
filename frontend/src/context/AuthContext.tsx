import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import useCreateMutation from '../hooks/useCreateMutation';
import useLoginMutation from '../hooks/useLoginMutation';
import toastProvider from '../lib/toastProvider';
import { useLocalStorage } from '../lib/useLocalStorage';
import { AuthContextType, Author, LogInType, SignUpType } from '../types/types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [author, setAuthor] = useState<Author | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { getItem, removeItem, setItem } = useLocalStorage();

    const getConfig = () => ({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getItem('token')}`,
        },
    });
    const loginMutation = useLoginMutation({
        dataUrl: 'author',
        dataType: 'auteur'
    })
    const signUpMutation = useCreateMutation({
        dataUrl: 'author',
        dataType: 'Utilisateur'
    })

    const logIn: LogInType = async (credentials) => {
        const { email, password } = credentials
        try {
            const author = await loginMutation.mutateAsync({ data: { email, password } });
            console.log("this is author", author);
            setItem('token', author?.data?.token || '');
            getAuthorFromToken(author?.data?.token || '');

            navigate('/dashboard');
        } catch (err) {
            console.log(err)
        }
    };

    const signUp: SignUpType = async (userInfo) => {
        const { firstName,
            lastName,
            email,
            phoneNumber,
            password } = userInfo

        try {
            const signUp = await signUpMutation.mutateAsync(
                {
                    data: {
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        password,
                    }
                },
            )

            getAuthorFromToken(signUp?.data?.token || '');
            setItem('token', signUp?.data?.token || '');
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
        setAuthor({ ...decodedToken?.author });
    };

    useEffect(() => {
        const authorToken = getItem('token');
        console.log("this executes everywhere")
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
