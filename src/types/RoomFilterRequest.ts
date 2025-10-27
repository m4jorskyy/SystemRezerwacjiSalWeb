export default interface RoomFilterRequest {
    name?: string
    building?: string
    capacity?: number
    floor?: number
    whiteboard?: boolean
    projector?: boolean
    desks?: boolean
    startTime?: string
    endTime?: string
}