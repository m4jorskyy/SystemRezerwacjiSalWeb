import RoomStats from "../../../types/RoomStats";
import api from "../../api";

export default async function getRoomStatsById(roomId: number) : Promise<RoomStats[]> {
    const { data } = await api.get<RoomStats[]>(`/stats/rooms/${roomId}/weeks`);
    return data
}