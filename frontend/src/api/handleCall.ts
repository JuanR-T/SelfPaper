import axios, { AxiosResponse } from "axios";
import { MutateApi, QueryApi, TData } from "../types/types";

const defaultConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

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
    try {
        const res = await axios.post<TData>(url, data, config ?? defaultConfig)
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