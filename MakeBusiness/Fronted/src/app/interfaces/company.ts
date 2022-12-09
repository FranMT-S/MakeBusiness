
export interface Company {
    _id: string,
    nameCompany: string,
    description: string,
    phone?: string,
    category?: string,
    location?: string,
    state: Boolean,
    idPlan: string,
    idUser: string
}

export interface CompanyWithWeb{
    _id:string;
    nameCompany: string; 
    description: string; 
    category: string; 
    state: boolean; 
    web: WebWithPage
    page: {_id:string}[]
}

interface WebWithPage{
    _id: string;
    logo: string;
    description: string;
    keywords: string;
    pageMain:string
}
