export interface Author {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface AuthContextType {
    author?: Author | undefined;
    signUp?: (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string
    ) => Promise<void>;
    autoLogIn?: (token: string) => Promise<void>;
    changeOtherInfo?: (email: string, name: string) => Promise<void>;
    logIn?: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    changePassword?: (
        newPassword: string,
        currentPassword: string
    ) => Promise<void>;
    getConfig: () => Record<string, unknown>;
}

export type LoginResponse = {
    token: string;
    msg: string;
};