export interface AddRoomRequest {
    name: string
    building: string
    capacity: number
    floor: number
    whiteboard: boolean
    projector: boolean
    desks: boolean
}