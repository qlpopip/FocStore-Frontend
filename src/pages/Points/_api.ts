import { API } from "utils/API";

export const getPoints = () => {
    return new API({
        url: `attendance`
    }).get();
};

