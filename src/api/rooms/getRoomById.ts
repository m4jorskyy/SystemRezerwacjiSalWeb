import api from "../api";
import Room from "../../types/Room";

export default async function getRoomById(roomId: number) : Promise<Room> {
    const { data } = await api.get<Room>(`/rooms/${roomId}`)
    return data
}