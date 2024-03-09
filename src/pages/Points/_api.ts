import { API } from "utils/API";

export const getPoints = () => {
    return new API({
        url: `attendance`
    }).get();
};
export const getHistory = () => {
    return new API({
        url: `user/history`
    }).get();
};

