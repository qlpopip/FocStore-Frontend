import { API } from "utils/API";

export const getEvent = (id: number) => {
    return new API({
        url: `event/${id}`
    }).get();
};

