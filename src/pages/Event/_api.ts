import { API } from "utils/API";

export const getEvents = () => {
    return new API({
        url: `event?pageNo=1&limit=100`
    }).get();
};

