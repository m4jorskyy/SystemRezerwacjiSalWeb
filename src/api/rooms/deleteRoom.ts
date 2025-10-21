import api from "../api";

export default async function deleteRoom(roomId: number): Promise<void> {
    const response = await api.delete<void>(`/rooms/admin/${roomId}`)

    if(response.status !== 204) {
        throw new Error(`Unexpected error. ${response.status} - ${response.data}`)
    }
}