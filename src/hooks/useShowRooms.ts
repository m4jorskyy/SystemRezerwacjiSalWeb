import {useQuery} from "@tanstack/react-query";
import filterRooms from "../api/rooms/filterRooms";
import RoomFilterRequest from "../types/RoomFilterRequest";

export default function useShowRooms() {
    const credentials: RoomFilterRequest = {}

    return useQuery({
        queryKey: ['showRooms'],
        queryFn: () => filterRooms(credentials),
        staleTime: Infinity
    })
}