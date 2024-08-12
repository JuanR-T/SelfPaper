import axios, { AxiosError, AxiosResponse } from "axios";
import { MutateApi, QueryApi, TData } from "../types/types";

const defaultConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


/** This interceptor will logout user and delete token if it's outdated */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("Am I interupting post", response);

        return response;
    },
    
    async (error: AxiosError) => {
        console.log("401 catched")
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Token might be invalid or expired.");
            localStorage.removeItem('token');
            console.log("token deleted")
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
        const res = await axios.get<TData>(url, config ?? defaultConfig)
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
        const res = await axios.post<any>(url, data, config);
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
        const res = await axios.put<TData>(url, data, config ?? defaultConfig)
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
    {data, config,}
) => {
    try {
        const res = await axios.delete<TData>(url, config ?? defaultConfig);
        return res; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<TData>;
        }
        throw error
    }
};