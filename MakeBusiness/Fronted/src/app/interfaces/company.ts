import * as internal from "stream"


export interface Company {
    id: string,
    nameCompany: string,
    description: string,
    phone?: string,
    category?: string,
    location?: string,
    state: Boolean,
    idPlan: string,
    idWeb: string,
    idUser: string
}
