import { ProductType } from "dto/productDto"

export interface OrderType {
  product: ProductType
  productCount: number
}
