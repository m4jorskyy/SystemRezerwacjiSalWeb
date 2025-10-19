export interface AddReservationRequest {
    roomId: number
    userId: number
    startTime: string
    endTime: string
    title: string
}