import { ProductType } from "dto/productDto"

export interface OrderType {
  product: ProductType
  productCount: number
}
export interface OrderStatusType {
  id: number,
  status: string,
  first_name: string,
  last_name: string,
  address: string,
  totalPrice: number,
  road_address: string,
  others: string,
  zip_code: number,
  custom_code: string,
  email: string,
  phone: string,
  paid: boolean,
  priceType: string,
  updated_at: string,
  created_at: string,
  author: {
    address: string,
    nonce: string,
    updated_at: string,
    created_at: string,
  },
  orderProducts: [
    {
      id: number,
      quantity: number,
      product: ProductType
    },

  ]
}