import RoomStats from "../../../types/RoomStats";
import api from "../../api";

export default async function getRoomStatsByWeek(roomId: number, weekStart: string) : Promise<RoomStats> {
    const { data } = await api.get<RoomStats>(`/stats/rooms/${roomId}?weekStart=${weekStart}`)
    return data
}