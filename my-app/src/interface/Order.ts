
import { IProducts } from "./Product"

export interface IOrder{
    _id :string
    product:IProducts
    totalOrder:number
    createdAt:string
    updatedAt:string
}