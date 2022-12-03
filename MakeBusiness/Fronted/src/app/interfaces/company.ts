import * as internal from "stream"


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
