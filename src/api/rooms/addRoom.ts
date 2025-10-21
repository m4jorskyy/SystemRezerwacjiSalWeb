import AddRoomRequest from "../../types/AddRoomRequest";
import AddRoomResponse from "../../types/AddRoomResponse";
import api from "../api";

export default async function addRoom(credentials: AddRoomRequest): Promise<AddRoomResponse> {
    const { data } = await api.post<AddRoomResponse>("/rooms/admin", credentials)
    return data
}