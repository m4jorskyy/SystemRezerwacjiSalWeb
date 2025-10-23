import {useQuery} from "@tanstack/react-query";
import filterRooms from "../api/rooms/filterRooms";
import RoomFilterRequest from "../types/RoomFilterRequest";
import Room from "../types/Room";

export default function useFindRooms(startTime: string, endTime: string) {
    const request: RoomFilterRequest = {
        name: null,
        building: null,
        capacity: null,
        floor: null,
        whiteboard: null,
        projector: null,
        desks: null,
        startTime: startTime,
        endTime: endTime,
    }

    return useQuery<Room[]>({
        queryKey: ["findRooms", startTime, endTime],
        queryFn: () => filterRooms(request),
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 2,
        enabled: false
    })
}