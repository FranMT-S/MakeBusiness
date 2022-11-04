import * as internal from "stream"

export interface CompanyDescription {
    id: string,
    nameCompany: String,
    description: String,
    phone: string,
    category: String,
    state: number,
    location: String,
    planName: string,
    idWeb: String,
    idUser: String
}


export interface Company {
    id: string,
    nameCompany: String,
    description: String,
    phone: string,
    category: String,
    location: String,
    state: Boolean,
    idPlan: string,
    idWeb: String,
    idUser: String
}
