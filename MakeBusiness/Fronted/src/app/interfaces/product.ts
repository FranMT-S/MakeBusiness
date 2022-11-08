export interface Product {
    id: string,
    name: string;
    price: number;
    description?: string;
    score: number;
    counterVotes: number;
    image?: string;
    categories?: string;
    idCompany: string;
}

