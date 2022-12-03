import { ProductHistory } from "./product"

export interface User {
    _id: string,
    userName: string,
    email: string,
    phone?: string,
    password: string,
    type: string,
    state: number
}

export interface Client  extends User{
    history?: ProductHistory[];
}


