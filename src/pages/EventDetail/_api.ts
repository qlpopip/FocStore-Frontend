import { API } from "utils/API";

export const getEvent = (id: number) => {
    return new API({
        url: `event/${id}`
    }).get();
};
export const getEventPoint = (id: number) => {
    return new API({
        url: `event-point/${id}`
    }).get();
};
export const postEventPoint = (payload: { eventId: number }) => {
    return new API({
        url: 'event-point',
        payload
    }).post();
};
