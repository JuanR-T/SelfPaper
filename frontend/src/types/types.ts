import { AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutationResult, UseQueryResult } from "react-query";
/** Misc */

export type DataRefetchProps =
    | UseQueryResult<BooksQueryResponse, Error>
    | UseQueryResult<PublicationQueryResponse, Error>
    | UseQueryResult<PublisherQueryResponse, Error>
    | UseQueryResult<ThemeQueryResponse, Error>
    | null;

export type MutationConfig = <TVariables extends MutationPayload>(
    method: MutateApi,
    url: string,
    successMessage: string,
    errorMessage: string,
) => UseMutationResult<TData ,Error, TVariables>;

export type TData = {
    found: boolean;
    object: ApiDataResponse;
    data?: {
        authenticated: boolean;
        token: string;
    }
};
export type MutationPayload = {
    data: ApiDataResponse;
    config?: Record<string, unknown>;
};
export interface MutateApi {(
    url: string, 
    payload: MutationPayload
    ): Promise<AxiosResponse<TData>>;
}
export interface MutationProps {
    dataUrl: string;
    dataType: string;
    dataId?: string;
}
export interface QueryApi {(
    url: string, 
    config: Record<string, unknown>
    ): Promise<AxiosResponse<TData>>;
}

export type ApiDataResponse = Book | Publication | Publisher | Images | Theme | LogInData | SignUpData;

export type CapitalizeLetterTypes = string | string[];

/** Author */
export interface Author {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}
/** Common */

export interface AuthContextType {
    author?: Author | undefined;
    autoLogIn?: (token: string) => Promise<void>;
    changeOtherInfo?: (email: string, name: string) => Promise<void>;
    logIn?: LogInType;
    signUp?: SignUpType;
    logOut: () => void;
    changePassword?: (
        newPassword: string,
        currentPassword: string
    ) => Promise<void>;
    getConfig: () => Record<string, unknown>;
}

export type LogInData = {email: string, password: string};
export type LogInType = (credentials: LogInData) => Promise<void>;
export type SignUpData = {
    firstName : string,
    lastName : string,
    email : string,
    phoneNumber : string,
    password : string,
}
export type SignUpType = (userInfo: SignUpData) => Promise<void>;

export interface ApiContextType {
    publicationQuery: UseQueryResult<PublicationQueryResponse, Error>,
    bookQuery: UseQueryResult<BooksQueryResponse, Error>
    publisherQuery: UseQueryResult<PublisherQueryResponse, Error>,
    themeQuery: UseQueryResult<ThemeQueryResponse, Error>,
    imageQuery: UseQueryResult<ImagesQueryResponse, Error>,
}

export type LoginResponse = {
    token: string;
    msg: string;
};

/** Publisher */

export interface PublisherQueryResponse {
    data : 
    {
        found: boolean;
        publisher: Publisher[];
    }
}
export interface Publisher {
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
    data : 
    {
        found: boolean;
        theme: Theme[];
    }
}
export interface PublicationQueryResponse {
    data : 
    {
        found: boolean;
        publications: Publication[];
    }
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
    _id?: string;
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
    author: Author,
    position?: string
}
export interface CreatePublicationProps {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<PublicationQueryResponse>>;
    handleCancelation?: (() => void | undefined) | undefined;
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
    data : 
    {
        found: boolean;
        images?: Images[];
    }
}

/** Books */

export interface BooksQueryResponse {
    data : {
        found: boolean;
        books: Book[];
    }
}
export interface Book {
    _id?: string;
    title: string;
    description: string;
    link: string;
    bookPublicationDate: string | Dayjs;
    bookAuthor: string | undefined;
    bookPublisher: Publisher;
    bookImage: Buffer | string ;
    thumbnail: Buffer | string ;
    theme: Theme;
}

export interface UpdateBooksProps{
    record: Book;
    refetch: () => Promise<QueryObserverResult<BooksQueryResponse, Error>>;
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
    refetch: () => Promise<QueryObserverResult<BooksQueryResponse, Error>>;
    editingRowId: string | null;
    setEditingRowId: Dispatch<SetStateAction<string | null>>;
}

export interface CreateBooksProps {
    refetch: () => Promise<QueryObserverResult<BooksQueryResponse, Error>>;
    handleCancelation?: (() => void | undefined) | undefined;
}