export interface User {
    id: string,
    name: string,
    email: string,
    phone?: string,
    password: string,
    type: string,
    state: number
}
