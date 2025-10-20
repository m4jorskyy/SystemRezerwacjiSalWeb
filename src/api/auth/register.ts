import RegisterRequest from "../../types/RegisterRequest";
import RegisterResponse from "../../types/RegisterResponse";
import api from "../api";

export default async function postRegister(credentials: RegisterRequest): Promise<RegisterResponse> {
    const { data } = await api.post<RegisterResponse>("/users/register", credentials)
    return data
}