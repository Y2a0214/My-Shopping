export interface product {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
}

export interface cart {
    id: number | undefined,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    quantity:number | undefined,
    userId:number,
    productID:number
}

export interface Price {
    id:number
    price:number
    discount:number
    tax:number
    delivery:number
    total:number
}