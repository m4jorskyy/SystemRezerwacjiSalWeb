export default interface LoginResponse {
    id: number
    token: string
    username: string
    lastname: string
    email: string
    role: "USER" | "ADMIN"
}