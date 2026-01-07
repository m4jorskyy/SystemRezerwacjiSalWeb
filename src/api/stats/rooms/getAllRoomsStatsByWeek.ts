import RoomStats from "../../../types/RoomStats";
import api from "../../api";

export default async function getAllRoomsStatsByWeek(weekStart: string) : Promise<RoomStats[]> {
    const { data } = await api.get<RoomStats[]>(`/stats/rooms?weekStart=${weekStart}`)
    return data
}