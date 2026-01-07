import UserStats from "../../../types/UserStats";
import api from "../../api";

export default async function getUsersStatsById(userId: number) : Promise<UserStats[]> {
    const { data } = await api.get<UserStats[]>(`/stats/users/${userId}/weeks`)
    return data
}