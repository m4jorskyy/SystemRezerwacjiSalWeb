import {AddReservationRequest} from "../../types/AddReservationRequest";
import {AddReservationResponse} from "../../types/AddReservationResponse";
import api from "../api";

export default async function editReservation(reservationId: number, credentials: AddReservationRequest): Promise<AddReservationResponse> {
    const { data } = await api.put<AddReservationResponse>(`/reservations/${reservationId}`, credentials)
    return data
}