import { API } from "utils/API";

export const postWifiPoint = (payload: { point: number, times: number }) => {
    return new API({
        url: 'wifi-point',
        payload
    }).post();
};

