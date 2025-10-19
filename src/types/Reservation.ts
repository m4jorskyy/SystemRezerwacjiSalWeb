export default interface Reservation {
    id: number
    startTime: string
    endTime: string
    createdAt: string
    title: string
    userId: number
    roomId: number
    roomName: string | null 
}