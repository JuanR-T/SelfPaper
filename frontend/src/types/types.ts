import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseQueryResult } from "react-query";
/** Misc */
export type ApiDataResponse = Book | Publication | Publisher | Images | Theme;
//export type TData = ApiDataResponse
export type TVariables = {
    data: ApiDataResponse
    config?: object
}
export interface RefetchTriggerProps {
    refetchTrigger: boolean;
    setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    handleCancelation?: (() => void | undefined) | undefined;
}

export interface MutationConfig<ApiDataResponse, TError, TVariables> {
        method: HandleApiCall<ApiDataResponse, TVariables>;
        url: string;
        successMessage: string;
        errorMessage: string;
    }

export interface HandleApiCall<ApiDataResponse, TVariables> {(
    url: string, 
    data: TVariables, 
    config?: object
): Promise<AxiosResponse<ApiDataResponse> | undefined>;
}

export type CapitalizeLetterTypes = string | string[];

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
export interface MutationProps {
    dataUrl: String;
    dataType: String;
}
export interface ApiContextType {
    publicationsQuery: UseQueryResult<PublicationQueryResponse, Error>,
    booksQuery: UseQueryResult<BooksQueryResponse, Error>
    publishersQuery: UseQueryResult<PublisherQueryResponse, Error>,
    themesQuery: UseQueryResult<ThemeQueryResponse, Error>,
    imagesQuery: UseQueryResult<ImagesQueryResponse, Error>,
}
//createMutation: (props: MutationProps) => UseMutationResult<ApiDataResponse, Error>,

export type LoginResponse = {
    token: string;
    msg: string;
};

/** Publisher */

export interface PublisherQueryResponse {
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

export interface ThemeQueryResponse {
    found: boolean;
    theme?: Theme[];
}
export interface PublicationQueryResponse {
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
export interface ImagesQueryResponse {
    found: boolean;
    images?: Images[];
}

/** Books */

export interface BooksQueryResponse {
    found: boolean;
    books?: Book[];
}
export interface Book {
    _id?: string;
    title: string;
    description: string;
    link: string;
    bookPublicationDate:any;
    bookAuthor: string | undefined;
    bookPublisher: Publisher;
    bookImage: Buffer | string ;
    thumbnail: Buffer | string ;
    theme: Theme;
}

export interface UpdateBooksProps{
    record: Book;
    refetch: Function;
    bookInitialState: SetStateAction<Book>;
    isBookDateEdited: boolean;
    setIsBookDateEdited: Dispatch<SetStateAction<boolean>>
    books: Book[] | undefined;
    editingRowId: string | null;
    isEditingBooks: boolean;
    editingRowData: Book;
    setIsEditingBooks: Dispatch<SetStateAction<boolean>>;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
    setEditingRowData: Dispatch<SetStateAction<Book>>;
}

export interface DeleteBooksProps {
    record: Book;
    setIsDeletingBooks: Dispatch<SetStateAction<boolean>>;
    editingRowId: string | null;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
}