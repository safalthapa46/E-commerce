export interface IProducts {
    productCategory:ICategory,
    productDescription:string,
    productImage:string,
    productName:string,
    productPrice:string,
    productRating:string,
    totalProduct:number,
    createdAt:string,
    _id:string
}

export interface ICategory{
    _id:string,
    categoryName:string
}