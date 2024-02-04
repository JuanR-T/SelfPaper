import { useState } from "react";

export const useLocalStorage = () => {
    const [value, setValue] = useState<string | null>(null);

    const setItem = (key: string, value: string) => {
        localStorage.setItem(key, value);
        setValue(value);
    };

    const getItem = (key: string) => {
        const storedValue = localStorage.getItem(key);

        if (storedValue !== value) {
            setValue(storedValue);
        }

        return storedValue;
    };

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
        setValue(null);
    };

    return { value, setItem, getItem, removeItem };
};