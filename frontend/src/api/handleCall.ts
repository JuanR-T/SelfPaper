import axios, { AxiosError, AxiosResponse } from "axios";
import { MutateApi, QueryApi, TData } from "../types/types";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/** This interceptor attachs token to post, put and delete methods */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && ['post', 'put', 'delete'].includes(config.method?.toLowerCase() || '')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/** This interceptor will logout user and delete token if it's outdated */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {

        return response;
    },
    
    (error: AxiosError) => {
        console.log("401 catched", error.response)
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Token might be invalid or expired.");
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const handleGet: QueryApi = async (
    url,
    config
) => {
    try {
        const res = await axiosInstance.get<TData>(url, config)
        return res;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<TData>;
        }
        throw error;
    }
};

export const handlePost: MutateApi = async (
    url,
    {data, config,}
) => {
    console.log("handlePostHere", {data, config})
    try {
        console.log("inside handlePOst")
        const res = await axiosInstance.post<any>(url, data, config);
        console.log("this is res publication", res)
        return res;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<TData>;
        }
        throw error;
    }
};

export const handlePut: MutateApi  = async (
    url,
    {data, config,}
) => {
    try {
        const res = await axiosInstance.put<TData>(url, data, config)
        return res;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<TData>
        }
        throw error
    }
};

export const handleDelete: MutateApi  = async (
    url,
    { config }
) => {
    try {
        const res = await axiosInstance.delete<TData>(url, config);
        return res; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<TData>;
        }
        throw error
    }
};