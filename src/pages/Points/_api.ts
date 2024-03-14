import { API } from "utils/API";

export const getHistory = () => {
    return new API({
        url: `user/history`
    }).get();
};

