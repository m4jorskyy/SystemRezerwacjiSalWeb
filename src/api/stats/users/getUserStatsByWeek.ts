import UserStats from "../../../types/UserStats";
import api from "../../api";

export default async function getUsersStatsByWeek(userId: number, weekStart: string) : Promise<UserStats> {
    const { data } = await api.get<UserStats>(`/stats/users/${userId}?weekStart=${weekStart}`)
    return data
}