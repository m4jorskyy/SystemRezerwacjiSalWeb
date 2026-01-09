import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoomStats from "../types/RoomStats";
import getRoomStatsById from "../api/stats/rooms/getRoomStatsById";
import { LoaderCircle } from "lucide-react";

export default function RoomDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // POPRAWKA 1: Dodajemy <RoomStats[]> - teraz TS wie, co tu będzie siedzieć
    const [history, setHistory] = useState<RoomStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoomStatsById(Number(id));

                const sorted = data.sort((a: any, b: any) =>
                    new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime()
                );

                setHistory(sorted);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) return <LoaderCircle />;

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
            >
                &larr; Go back
            </button>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">Room History #{id}</h1>

            <div className="overflow-hidden bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Week
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Reservation count
                        </th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Hour sum
                        </th>
                        <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Average hours
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-5 text-sm font-medium text-gray-900">
                                    {item.weekStart}
                                </td>
                                <td className="px-5 py-5 text-sm text-center text-gray-700">
                                        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-bold">
                                            {item.reservationsCount}
                                        </span>
                                </td>
                                <td className="px-5 py-5 text-sm text-right font-bold text-gray-800">
                                    {item.totalHours.toFixed(1)} h
                                </td>
                                <td className="px-5 py-5 text-sm text-right text-gray-500">
                                    {item.avgHours.toFixed(1)} h
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                                No data.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}