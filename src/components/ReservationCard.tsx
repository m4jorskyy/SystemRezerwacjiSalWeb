import Reservation from "../types/Reservation";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function ReservationCard({
                                            id,
                                            startTime,
                                            endTime,
                                            createdAt,
                                            title,
                                            userId,
                                            roomId,
                                            roomName
                                        }: Reservation) {

    // Funkcja pomocnicza do formatowania daty i czasu (Format Polski)
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            // np. 20 października 2023
            date: date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),
            // np. 14:30
            time: date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const start = formatDateTime(startTime);
    const end = formatDateTime(endTime);

    return (
        <div className="card mb-4 cursor-pointer transition-all duration-200 hover:border-primary hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">

            {/* Lewa sekcja: Tytuł i Sala */}
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-primary leading-tight">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{roomName}</span>
                </div>
            </div>

            {/* Prawa sekcja: Czas */}
            <div className="flex flex-col items-start sm:items-end gap-1 text-sm">

                {/* Data */}
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold capitalize">{start.date}</span>
                </div>

                {/* Godziny */}
                <div className="flex items-center gap-2 text-gray-500 px-2">
                    <Clock className="w-4 h-4" />
                    <span>
                        {start.time} - {end.time}
                    </span>
                </div>
            </div>

        </div>
    );
}