import { UserDetails } from "../user"

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: UserDetails
}