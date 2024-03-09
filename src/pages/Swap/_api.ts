import { API } from "utils/API";

export const swapPoint = (payload: { point: number }) => {
    return new API({
        url: `user`,
        payload
    }).patch();
};

