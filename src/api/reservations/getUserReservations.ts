import Reservation from "../../types/Reservation";
import api from "../api";

export default async function getUserReservations(userId: number): Promise<Reservation[]> {
    const { data } = await api.get<Reservation[]>(`/reservations/user/${userId}`)
    return data
}