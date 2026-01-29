import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getGlobalStats from "../api/stats/globalStats";
import getAllRoomsStatsByWeek from "../api/stats/rooms/getAllRoomsStatsByWeek";
import getAllUsersStatsByWeek from "../api/stats/users/getAllUsersStatsByWeek";
export default function useStats() {

    const getMonday = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const [currentDate, setCurrentDate] = useState(getMonday(new Date()));
    const weekStartParam = currentDate.toLocaleDateString('en-CA');

    const globalQuery = useQuery({
        queryKey: ['stats', 'global', weekStartParam],
        queryFn: () => getGlobalStats(weekStartParam)
    });

    const roomsQuery = useQuery({
        queryKey: ['stats', 'rooms', weekStartParam],
        queryFn: () => getAllRoomsStatsByWeek(weekStartParam)
    });

    const usersQuery = useQuery({
        queryKey: ['stats', 'users', weekStartParam],
        queryFn: () => getAllUsersStatsByWeek(weekStartParam)
    });

    const nextWeek = () => {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + 7);
        setCurrentDate(next);
    };

    const prevWeek = () => {
        const prev = new Date(currentDate);
        prev.setDate(prev.getDate() - 7);
        setCurrentDate(prev);
    };

    return {
        currentDate,
        nextWeek,
        prevWeek,
        globalQuery,
        roomsQuery,
        usersQuery
    };
}