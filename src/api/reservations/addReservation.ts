import {AddReservationRequest} from "../../types/AddReservationRequest";
import {AddReservationResponse} from "../../types/AddReservationResponse";
import api from "../api";

export default async function addReservation(credentials: AddReservationRequest) : Promise<AddReservationResponse> {
    const { data } = await api.post<AddReservationResponse>("/reservations", credentials)
    return data
}