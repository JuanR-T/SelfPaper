import axios from "axios";
import { ApiDataResponse, HandleApiCall, TVariables } from "../types/types";

const defaultConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const handleGet: HandleApiCall<ApiDataResponse, Record<string, unknown>>= async (
    url,
    config,
) => {
    const res = await axios
        .get(url, config ?? defaultConfig)
        .catch((err) => err.response);
    if (!res) return undefined;

    return res.data;
};

export const handlePost: HandleApiCall<ApiDataResponse, TVariables> = async (
    url,
    data,
    config,
) => {
    console.log("handle post data", data, config, url)
    const res = await axios
        .post(url, data, config ?? defaultConfig)
        .catch((err) => err.response);
    console.log("this is the response", res)
    if (!res) return undefined;

    return res.data;
};

export const handlePut: HandleApiCall<ApiDataResponse, Record<string, unknown>> = async (
    url,
    data,
    config,
) => {
    const res = await axios
        .put(url, data, config ?? defaultConfig)
        .catch((err) => err.response);
    if (!res) return undefined;

    return res.data;
};

export const handleDelete: HandleApiCall<ApiDataResponse, Record<string, unknown>> = async (
    url,
    config,
) => {
    const res = await axios
        .delete(url, config ?? defaultConfig)
        .catch((err) => err.response);
    if (!res) return undefined;

    return res.data;
};