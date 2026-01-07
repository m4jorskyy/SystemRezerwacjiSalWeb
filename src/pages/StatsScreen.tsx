import { useState } from "react";
import useStatistics from "../hooks/useStats";
import {
    LoaderCircle,
    ChevronLeft,
    ChevronRight,
    Trophy,
    Users,
    Building,
    Calendar,
    BarChart3,
    RefreshCw
} from "lucide-react";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

// --- LOADING STATE COMPONENT ---
const LoadingState = () => (
    <div className="flex flex-col justify-center items-center h-64 w-full">
        <LoaderCircle className="animate-spin text-primary w-10 h-10 mb-4" />
        <p className="text-gray-400 text-sm font-medium animate-pulse">Analyzing data...</p>
    </div>
);

export default function StatsScreen() {
    const {
        currentDate,
        nextWeek,
        prevWeek,
        globalQuery,
        roomsQuery,
        usersQuery
    } = useStatistics();

    const [activeTab, setActiveTab] = useState<"overview" | "rooms" | "users">("overview");

    // Helper to extract error message
    const getErrorMessage = (error: any) => {
        if (error?.response?.data?.message) return error.response.data.message;
        if (error?.message) return error.message;
        return "Unknown server error";
    };

    // Calculate end date (Sunday)
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 6);

    // Format date for English display (e.g., Jan 10 - Jan 16)
    const displayDateRange = `${currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`;

    // Helper to render Error with your Alert component + Retry Button
    const renderError = (error: any, refetch: () => void) => (
        <div className="flex flex-col items-center justify-center w-full py-8 animate-in fade-in">
            <div className="w-full max-w-md">
                <Alert type="error" message={getErrorMessage(error)} />
            </div>
            <button
                onClick={() => refetch()}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary hover:border-primary transition-all font-medium text-sm shadow-sm"
            >
                <RefreshCw className="w-4 h-4" /> Try Again
            </button>
        </div>
    );

    // Content Rendering Logic
    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                if (globalQuery.isLoading) return <LoadingState />;
                if (globalQuery.isError) return renderError(globalQuery.error, globalQuery.refetch);
                if (!globalQuery.data) return null;

                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Calendar className="w-24 h-24 text-indigo-500" />
                                </div>
                                <span className="text-5xl font-extrabold text-primary mb-1">
                                    {globalQuery.data.totalReservations}
                                </span>
                                <span className="text-gray-500 font-medium text-sm uppercase tracking-wide">Reservations</span>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Trophy className="w-24 h-24 text-emerald-500" />
                                </div>
                                <span className="text-5xl font-extrabold text-emerald-600 mb-1">
                                    {globalQuery.data.totalHours.toFixed(1)} h
                                </span>
                                <span className="text-gray-500 font-medium text-sm uppercase tracking-wide">Total Hours</span>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800">
                                <Trophy className="text-yellow-500 w-5 h-5" /> Weekly Highlights
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 transition hover:bg-gray-50">
                                    <div className="p-3 bg-white rounded-full shadow-sm mr-4 border border-gray-100">
                                        <Building className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Most Popular Room</p>
                                        <p className="text-xl font-bold text-gray-800">
                                            {globalQuery.data.topRoomId ? `Room #${globalQuery.data.topRoomId}` : "No data"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 transition hover:bg-gray-50">
                                    <div className="p-3 bg-white rounded-full shadow-sm mr-4 border border-gray-100">
                                        <Users className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Most Active User</p>
                                        <p className="text-xl font-bold text-gray-800">
                                            {globalQuery.data.topUserId ? `User #${globalQuery.data.topUserId}` : "No data"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "rooms":
                if (roomsQuery.isLoading) return <LoadingState />;
                if (roomsQuery.isError) return renderError(roomsQuery.error, roomsQuery.refetch);
                if (!roomsQuery.data) return null;

                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                            <Building className="text-primary w-5 h-5" /> Room Rankings
                        </h3>

                        {roomsQuery.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Building className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">No room data for this week.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {roomsQuery.data
                                    .sort((a, b) => b.totalHours - a.totalHours)
                                    .map((room) => (
                                        <div key={room.id} className="space-y-2 group">
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">Room #{room.roomId}</span>
                                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                                    {room.reservationsCount} reservations
                                                </span>
                                                </div>
                                                <div className="text-right">
                                                <span className="font-bold text-gray-800 text-xl block">
                                                    {room.totalHours.toFixed(1)}h
                                                </span>
                                                    <span className="text-xs text-gray-400">
                                                    avg. {room.avgHours.toFixed(1)}h
                                                </span>
                                                </div>
                                            </div>

                                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="bg-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                                    style={{ width: `${Math.min((room.totalHours / 50) * 100, 100)}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                );

            case "users":
                if (usersQuery.isLoading) return <LoadingState />;
                if (usersQuery.isError) return renderError(usersQuery.error, usersQuery.refetch);
                if (!usersQuery.data) return null;

                return (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                                <Users className="text-primary w-5 h-5" /> User Activity
                            </h3>
                        </div>

                        {usersQuery.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">No user activity recorded.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4 text-center">Reservations</th>
                                        <th className="px-6 py-4 text-center">Total Hours</th>
                                        <th className="px-6 py-4 text-right">Avg. Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                    {usersQuery.data
                                        .sort((a, b) => b.totalHours - a.totalHours)
                                        .map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition group cursor-default">
                                                <td className="px-6 py-4 font-bold text-gray-800 group-hover:text-primary transition-colors">
                                                    #{user.userId}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                        {user.reservationsCount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center font-bold text-emerald-600">
                                                    {user.totalHours.toFixed(1)} h
                                                </td>
                                                <td className="px-6 py-4 text-right text-gray-500">
                                                    {user.avgHours.toFixed(1)} h
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50/50">

            {/* --- HEADER --- */}
            <div className="w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <BarChart3 className="text-primary w-8 h-8" /> Statistics
                    </h1>
                    <p className="text-gray-500 text-sm">Analyze resource usage and activity.</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200">
                    <button onClick={prevWeek} className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 active:scale-95">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 px-2 font-semibold text-gray-700  justify-center select-none">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{displayDateRange}</span>
                    </div>
                    <button onClick={nextWeek} className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 active:scale-95">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* --- TABS --- */}
            <div className="flex p-1 bg-white rounded-xl border border-gray-200 mb-6 w-full max-w-4xl shadow-sm">
                {(["overview", "rooms", "users"] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                            activeTab === tab
                                ? "bg-primary text-white shadow-md transform scale-[1.02]"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- MAIN CONTENT CONTAINER --- */}
            <div className="w-full max-w-4xl min-h-[400px]">
                {renderContent()}
            </div>

            <Link to="/menu" className="btn-secondary w-fit mt-10">Back to Menu</Link>
        </div>
    );
}