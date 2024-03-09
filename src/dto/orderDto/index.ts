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
  country: string,
  region: string,
  city: string,
  zip_code: number,
  custom_code: string,
  email: string,
  phone: string,
  paid: boolean,
  totalPrice: string,
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