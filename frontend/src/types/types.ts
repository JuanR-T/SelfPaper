/** Author */

export interface Author {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}
/** Common */

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

/** Publisher */

export interface PublisherApiResponse {
    found: boolean;
    publisher?: Publisher[];
}
export interface Publisher {
    _id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    founded_at: string;
    services?: string[];
}

export interface CreatePublisherFormProps {
    refetchTrigger: boolean;
}

/** Themes */

export interface ThemeApiResponse {
    found: boolean;
    theme?: Theme[];
}

export interface Theme {
    _id: string;
    title: string;
    description: string;
    image: Buffer | string;
}

export interface CreateThemeProps {
    refetchTrigger: boolean;
}