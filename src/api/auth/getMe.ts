import LoginResponse from "../../types/LoginResponse";
import api from "../api";

export default async function getMe(): Promise<LoginResponse> {
    const { data } = await api.get("/api/me")
    return data
}