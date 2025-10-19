export default interface RoomFilterRequest {
    name: string | null
    building: string | null
    capacity: number | null
    floor: number | null
    whiteboard: boolean | null
    projector: boolean | null
    desks: boolean | null
    startTime: string | null
    endTime: string | null
}