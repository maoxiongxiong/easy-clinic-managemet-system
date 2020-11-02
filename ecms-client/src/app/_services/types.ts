export interface User {
    id: number,
    role: UserRole,
    name: string,
    iat: number
}

export enum UserRole {
    Admin = "admin",
    User = "user",
    Patient = "patient",
    Doctor = "doctor",
    Pharmaciest = "pharmaciest"
}