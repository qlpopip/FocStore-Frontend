import { API } from "utils/API";

export const getProduct = (id: string) => {
    return new API({
        url: `product/${id}`
    }).get();
};

