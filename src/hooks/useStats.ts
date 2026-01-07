import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getGlobalStats from "../api/stats/globalStats";
import getAllRoomsStatsByWeek from "../api/stats/rooms/getAllRoomsStatsByWeek";
import getAllUsersStatsByWeek from "../api/stats/users/getAllUsersStatsByWeek";
export default function useStats() {

    // Funkcja pomocnicza: Zawsze zwraca poniedziałek dla danej daty
    const getMonday = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    // Stan trzymający obecny poniedziałek
    const [currentDate, setCurrentDate] = useState(getMonday(new Date()));

    // Formatowanie do YYYY-MM-DD dla API
    // .toLocaleDateString('en-CA') zwraca format ISO (YYYY-MM-DD) w większości środowisk,
    // ale dla pewności używamy manualnego formatowania, żeby uniknąć problemów ze strefami czasowymi
    const weekStartParam = currentDate.toLocaleDateString('en-CA');

    // 1. Globalne Statystyki
    const globalQuery = useQuery({
        queryKey: ['stats', 'global', weekStartParam],
        queryFn: () => getGlobalStats(weekStartParam)
    });

    // 2. Statystyki Pokoi
    const roomsQuery = useQuery({
        queryKey: ['stats', 'rooms', weekStartParam],
        queryFn: () => getAllRoomsStatsByWeek(weekStartParam)
    });

    // 3. Statystyki Użytkowników
    const usersQuery = useQuery({
        queryKey: ['stats', 'users', weekStartParam],
        queryFn: () => getAllUsersStatsByWeek(weekStartParam)
    });

    // Nawigacja
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