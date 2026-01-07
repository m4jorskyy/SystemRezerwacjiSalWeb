import GlobalStats from "../../types/GlobalStats";
import api from "../api";

export default async function getGlobalStats(weekStart: string) : Promise<GlobalStats> {
    const { data } = await api.get<GlobalStats>(`/stats/global?weekStart=${weekStart}`)
    return data
}