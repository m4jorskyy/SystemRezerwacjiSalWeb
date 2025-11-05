import {useQuery} from "@tanstack/react-query";
import filterRooms from "../api/rooms/filterRooms";
import RoomFilterRequest from "../types/RoomFilterRequest";
import Room from "../types/Room";

export default function useFindRooms(roomFilterRequest: RoomFilterRequest) {
    return useQuery<Room[]>({
        queryKey: ["findRooms", roomFilterRequest],
        queryFn: () => filterRooms(roomFilterRequest),
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 2,
        enabled: !!roomFilterRequest.startTime && !!roomFilterRequest.endTime && (roomFilterRequest.startTime < roomFilterRequest.endTime)
    })
}