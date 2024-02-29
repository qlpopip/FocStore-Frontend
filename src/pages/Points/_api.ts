import { API } from "utils/API";

export const getPoints = () => {
    return new API({
        url: `/api/attendance`
        // url: `/api/product?pageNo=1&limit=10        `
    }).get();
};

