import {useQuery} from "@tanstack/react-query";
import {useAuth} from "../context/AuthContext";
import getUserReservations from "../api/reservations/getUserReservations";

export default function useShowReservations() {
    const { user } = useAuth()

    return useQuery({
        queryKey: ["showReservations", user?.id],
        queryFn: async () => {
            if(!user?.id) return []
            return await getUserReservations(user.id)
        },
        staleTime: Infinity,
        enabled: !!user?.id
    })
}