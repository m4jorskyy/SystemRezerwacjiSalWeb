import LoginRequest from "../../types/LoginRequest";
import LoginResponse from "../../types/LoginResponse";
import api from "../api";

export default async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/users/login", credentials)
    return data
}