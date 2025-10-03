export type ProductType = {
    id: string,
    title: string,
    price:string,
    quantity:number,
    image?:string
}
export type CartType = {
    [key:string]:number
}
export type Products = ProductType[]