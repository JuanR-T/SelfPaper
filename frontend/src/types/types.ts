import { Dispatch, SetStateAction } from "react";
/** Misc */
export interface RefetchTriggerProps {
    refetchTrigger: boolean;
    setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    handleCancelation?: (() => void | undefined) | undefined;
}

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
    [x: string]: any;
    _id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    founded_at: string;
    services?: string[];
    service?: string;
}

/** Themes */

export interface ThemeApiResponse {
    found: boolean;
    theme?: Theme[];
}
export interface PublicationApiResponse {
    found: boolean;
    publications?: Publication[];
}

export interface Theme {
    _id: string;
    title: string;
    description: string;
    image: Buffer | string;
}

export interface DeleteThemeProps {
    record: Theme;
    setIsDeletingTheme: Dispatch<SetStateAction<boolean>>;
    editingRowId: string | null;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
}
export interface UpdateThemeProps {
    record: Theme;
    editingRowId: string | null;
    isEditingTheme: boolean;
    editingRowData: Theme;
    setIsEditingTheme: Dispatch<SetStateAction<boolean>>;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
    setEditingRowData: Dispatch<SetStateAction<Theme>>;
}

/** Publications */

export interface Publication {
    _id: string;
    title: string,
    description: string,
    link?: string,
    thumbnail: Buffer | string ,
    postImage: Buffer | string ,
    type: string[],
    theme: Theme,
    excerpt: string,
    publicationDate: string,
    publisher: Publisher,
    author: any,
    position?: string
}

export interface UpdatePublicationsProps {
    record: Publication;
    editingRowId: string | null;
    isEditingPublication: boolean;
    editingRowData: Publication;
    setIsEditingPublication: Dispatch<SetStateAction<boolean>>;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
    setEditingRowData: Dispatch<SetStateAction<Publication>>;
}

export interface DeletePublicationsProps {
    record: Publication;
    setIsDeletingPublication: Dispatch<SetStateAction<boolean>>;
    editingRowId: string | null;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
}

/** Images */
export interface Images {
    _id: string;
    title: string,
    image: string
}
export interface ImagesApiResponse {
    found: boolean;
    images?: Images[];
}