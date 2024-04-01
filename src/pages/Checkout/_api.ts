import { API } from "utils/API";

export interface CreateOrderType {
    status: string,
    priceType: string,
    first_name: string,
    last_name: string,
    custom_code: string,
    address: string,
    totalPrice: number | string,
    road_address: string,
    others: string,
    zip_code: string | number,
    email: string,
    phone: string,
    products: {
        productId: number,
        quantity: number
    }[]
}
export const createOrder = (payload: CreateOrderType) => {
    return new API({
        url: 'order',
        payload
    }).post();
};

export const removeOrder = (id: number) => {
    return new API({
        url: `order/${id}`
    }).delete();
}

