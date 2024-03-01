import { API } from "utils/API";

export const getProducts = (pageNo = 1, limit = 5) => {
    return new API({
        url: `product?pageNo=${pageNo}&limit=${limit}`
    }).get();
};

