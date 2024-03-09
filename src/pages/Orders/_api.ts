import { API } from "utils/API";

export const getOrders = () => {
    return new API({
        url: `order/all-own-orders`
    }).get();
};
