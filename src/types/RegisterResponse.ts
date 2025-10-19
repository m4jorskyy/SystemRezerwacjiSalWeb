export default interface RegisterResponse {
    id: number
    username: string
    lastname: string
    email: string
    role: "USER" | "ADMIN"
}