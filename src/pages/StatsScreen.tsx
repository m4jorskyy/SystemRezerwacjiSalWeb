import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Adjust imports based on your file structure
import GlobalStats from "../types/GlobalStats";
import RoomStats from "../types/RoomStats";
import UserStats from "../types/UserStats";
// Import your API functions
import getAllRoomsStatsByWeek from "../api/stats/rooms/getAllRoomsStatsByWeek";
import getAllUsersStatsByWeek from "../api/stats/users/getAllUsersStatsByWeek";
import getGlobalStats from "../api/stats/globalStats";


export default function StatsScreen() {
    const navigate = useNavigate();

    // State management
    const [weekStart, setWeekStart] = useState<string>(getCurrentWeekStart());
    const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
    const [roomStats, setRoomStats] = useState<RoomStats[]>([]);
    const [userStats, setUserStats] = useState<UserStats[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Added Error state

    const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'users'>('overview');

    // Helper to get current Monday
    function getCurrentWeekStart(): string {
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(d.setDate(diff));
        return monday.toISOString().split('T')[0];
    }

    // Navigation handlers
    const handlePrevWeek = () => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() - 7);
        setWeekStart(date.toISOString().split('T')[0]);
    };

    const handleNextWeek = () => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + 7);
        setWeekStart(date.toISOString().split('T')[0]);
    };

    // Data fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Clear previous errors

            // 1. CLEAR OLD DATA to avoid showing stale data from previous week
            setGlobalStats(null);
            setRoomStats([]);
            setUserStats([]);

            try {
                // Fetch all data in parallel
                const [global, rooms, users] = await Promise.all([
                    getGlobalStats(weekStart),
                    getAllRoomsStatsByWeek(weekStart),
                    getAllUsersStatsByWeek(weekStart)
                ]);

                setGlobalStats(global);
                setRoomStats(rooms);
                setUserStats(users);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setError("Failed to load statistics for this week.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [weekStart]);

    // Common Header Component (to avoid duplication)
    const HeaderControls = () => (
        <div className="flex justify-between items-center mb-8">
            <button onClick={handlePrevWeek} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                &larr; Prev Week
            </button>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Statistics</h1>
                <p className="text-gray-500 mt-1">Week of: {weekStart}</p>
            </div>
            <button onClick={handleNextWeek} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Next Week &rarr;
            </button>
        </div>
    );

    // Render Logic

    if (loading) {
        return <div className="p-10 text-center text-xl">Loading stats...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <HeaderControls />
                <div className="p-10 bg-red-50 text-red-600 rounded-lg border border-red-200 text-center">
                    <h3 className="text-lg font-bold">Error</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-white border border-red-200 rounded hover:bg-red-50"
                    >
                        Try Refreshing
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <HeaderControls />

            {/* Tabs */}
            <div className="flex border-b border-gray-300 mb-6">
                <button
                    className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`px-6 py-3 font-medium ${activeTab === 'rooms' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('rooms')}
                >
                    Rooms
                </button>
                <button
                    className={`px-6 py-3 font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow p-6">

                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    globalStats ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-blue-50 rounded-lg text-center">
                                <h3 className="text-lg text-gray-600">Total Reservations</h3>
                                <p className="text-4xl font-bold text-blue-600 mt-2">{globalStats.totalReservations}</p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-lg text-center">
                                <h3 className="text-lg text-gray-600">Total Hours</h3>
                                <p className="text-4xl font-bold text-green-600 mt-2">{globalStats.totalHours.toFixed(1)} h</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-gray-600 mb-1">Top Room</h3>
                                <p className="text-xl font-bold">
                                    {globalStats.topRoomId ? `Room #${globalStats.topRoomId}` : "No data"}
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-gray-600 mb-1">Top User</h3>
                                <p className="text-xl font-bold">
                                    {globalStats.topUserId ? `User #${globalStats.topUserId}` : "No data"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        // 2. EMPTY STATE FOR OVERVIEW
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-xl">No overview data available for this week.</p>
                        </div>
                    )
                )}

                {/* --- ROOMS TAB --- */}
                {activeTab === 'rooms' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3">Room ID</th>
                                <th className="px-6 py-3 text-center">Reservations</th>
                                <th className="px-6 py-3 text-right">Total Hours</th>
                                <th className="px-6 py-3 text-right">Avg Duration</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {roomStats.map((room) => (
                                <tr
                                    key={room.roomId}
                                    onClick={() => navigate(`/stats/room/${room.roomId}`)}
                                    className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                                    title="Click to view history"
                                >
                                    <td className="px-6 py-4 font-medium">Room #{room.roomId}</td>
                                    <td className="px-6 py-4 text-center">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">
                                                {room.reservationsCount}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-700">
                                        {room.totalHours.toFixed(1)} h
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-500">
                                        {room.avgHours.toFixed(1)} h
                                    </td>
                                </tr>
                            ))}
                            {roomStats.length === 0 && (
                                <tr><td colSpan={4} className="text-center py-6 text-gray-500">No room data available.</td></tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- USERS TAB --- */}
                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3 text-center">Reservations</th>
                                <th className="px-6 py-3 text-right">Total Hours</th>
                                <th className="px-6 py-3 text-right">Avg Duration</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {userStats.map((user) => (
                                <tr
                                    key={user.userId}
                                    onClick={() => navigate(`/stats/user/${user.userId}`)}
                                    className="hover:bg-green-50 cursor-pointer transition-colors duration-150"
                                    title="Click to view history"
                                >
                                    <td className="px-6 py-4 font-medium">User #{user.userId}</td>
                                    <td className="px-6 py-4 text-center">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                                                {user.reservationsCount}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-700">
                                        {user.totalHours.toFixed(1)} h
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-500">
                                        {user.avgHours.toFixed(1)} h
                                    </td>
                                </tr>
                            ))}
                            {userStats.length === 0 && (
                                <tr><td colSpan={4} className="text-center py-6 text-gray-500">No user data available.</td></tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}