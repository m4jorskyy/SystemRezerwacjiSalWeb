import AddRoomResponse from "../../types/AddRoomResponse";
import api from "../api";
import AddRoomRequest from "../../types/AddRoomRequest";

export default async function editRoom(roomId: number, credentials: AddRoomRequest): Promise<AddRoomResponse> {
    const { data } = await api.put<AddRoomResponse>(`/rooms/admin/${roomId}`, credentials)
    return data
}