import api from "../api";

export default async function deleteReservation(reservationId: number) : Promise<void> {
    const response = await api.delete<void>(`/reservations/${reservationId}`)

    if(response.status !== 204) {
        throw new Error(`Unexpected error. ${response.status} - ${response.data}`)
    }
}