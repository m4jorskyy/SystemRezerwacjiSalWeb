import RoomFilterRequest from "../../types/RoomFilterRequest";
import Room from "../../types/Room";
import api from "../api";

export default async function filterRooms(credentials: RoomFilterRequest): Promise<Room[]>{
    const { data } = await api.post<Room[]>("rooms/filter", credentials)
    return data
}