import axios from "axios";
import { HandleApiCall } from "../types/types";

const defaultConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const handleGet: HandleApiCall<any>= async (
    url,
    data,
    config,
) => {
    const res = await axios
        .get(url, config ?? defaultConfig)
        .catch((err) => err.response);
    if (!res) return undefined;

    return res.data;
};

export const handlePost: HandleApiCall<any> = async (
    url,
    data,
    config,
) => {
    const res = await axios
        .post(url, data, config ?? defaultConfig)
        .catch((err) => err.response);
    console.log("this is the response", res)
    if (!res) return undefined;

    return res.data;
};

export const handlePut: HandleApiCall<any> = async (
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

export const handleDelete: HandleApiCall<any> = async (
    url,
    data,
    config,
) => {
    const res = await axios
        .delete(url, config ?? defaultConfig)
        .catch((err) => err.response);
    if (!res) return undefined;

    return res.data;
};