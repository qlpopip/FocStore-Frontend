import { API } from "utils/API";

export interface CreateOrderType {
    status: string,
    totalPrice: number,
    first_name: string,
    last_name: string,
    custom_code: string,
    address: string,
    country: string,
    region: string,
    city: string,
    zip_code: number,
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

