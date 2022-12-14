import { ProductHistory } from "./product"

export interface User {
    _id: string,
    userName: string,
    email: string,
    phone?: string,
    password: string,
    type: string,
    state: number,
    image?:string,
}


export interface Client {
    _id: string,
    idUser: string,
    historical?: ProductHistory[];
}
