import { User } from "./user";

export interface Product {
    _id: string,
    name: string;
    price: number;
    description?: string;
    votes?: { "idUser":string,"point":number}[];
    image?: string | File;
    categories?: string;
    idCompany: string;
}

export interface ProductHistory{
    _id: string,
    name: string,   
    price: number;
    quantity: number;
    total: number;
    date: Date;
}