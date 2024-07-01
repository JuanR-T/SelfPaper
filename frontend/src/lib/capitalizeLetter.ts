import { CapitalizeLetterTypes } from "../types/types";

const Capitalize = (input: CapitalizeLetterTypes) => {
    if (typeof input === 'string') {
        return input.charAt(0).toUpperCase() + input.slice(1);
    } else if (Array.isArray(input)) {
        return input.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    } else {
        throw new Error("Input must be a string or an array of strings");
    }
}

export default Capitalize;