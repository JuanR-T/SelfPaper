import { useApiContext } from "../context/ApiContext";
import { DataRefetchProps } from "../types/types";

const dataRefetch = (dataType: string): DataRefetchProps => {
    const { bookQuery, publicationQuery, publisherQuery, themeQuery } = useApiContext();

    switch (dataType) {
        case 'book':
            return bookQuery;
        case 'publication':
            return publicationQuery;
        case 'publisher':
            return publisherQuery;
        case 'theme':
            return themeQuery;
        default:
            return null;
    }
};

export default dataRefetch;