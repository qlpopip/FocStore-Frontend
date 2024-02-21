import { API } from "utils/API";

export const getProducts = (pageNo = 1, limit = 5) => {
    return new API({
        url: `/api/product?pageNo=${pageNo}&limit=${limit}`
        // url: `/api/product?pageNo=1&limit=10        `
    }).get();
};

