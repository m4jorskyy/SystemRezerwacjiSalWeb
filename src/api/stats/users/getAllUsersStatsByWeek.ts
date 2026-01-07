import UserStats from "../../../types/UserStats";
import api from "../../api";

export default async function getAllUsersStatsByWeek(weekStart: string) : Promise<UserStats[]> {
    const { data } = await api.get<UserStats[]>(`/stats/users?weekStart=${weekStart}`)
    return data
}