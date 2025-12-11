import Reservation from "../types/Reservation";
import { Calendar, Clock, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

// 1. ZMIANA: Dodajemy '?' - propsy są teraz opcjonalne
interface ReservationCardProps extends Reservation {
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function ReservationCard({
                                            startTime,
                                            endTime,
                                            title,
                                            roomName,
                                            onEdit,
                                            onDelete
                                        }: ReservationCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const start = formatDateTime(startTime);
    const end = formatDateTime(endTime);

    // Sprawdzamy, czy przekazano funkcje (czy karta ma być edytowalna)
    const isEditable = onEdit && onDelete;

    return (
        <div className="card relative mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full pr-10">

            {/* 2. ZMIANA: Wyświetlamy menu TYLKO jeśli przekazano funkcje */}
            {isEditable && (
                <div className="absolute top-3 right-3 z-20">
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                        <div
                            onPointerDown={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    if (onEdit) onEdit();
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Pencil className="w-4 h-4" /> Edytuj
                            </button>

                            <div className="border-t border-gray-100"></div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(false);
                                    if (onDelete) onDelete();
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Usuń
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Reszta karty bez zmian */}
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-primary leading-tight">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{roomName}</span>
                </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1 text-sm">
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold capitalize">{start.date}</span>
                </div>

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