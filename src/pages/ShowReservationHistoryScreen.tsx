import useShowReservations from "../hooks/useShowReservations";
import ReservationCard from "../components/ReservationCard";
import { Link } from "react-router-dom";
import Reservation from "../types/Reservation";
import { LoaderCircle, History, CalendarX } from "lucide-react";
import Alert from "../components/Alert";

export default function ShowReservationHistoryScreen() {
    const {
        data: reservations,
        isLoading,
        isError,
        error
    } = useShowReservations();

    const now = Date.now();

    const pastReservations: Reservation[] | undefined = reservations?.filter(
        reservation => {
            const endTimeMs = new Date(reservation.endTime).getTime();
            return endTimeMs < now;
        }
    );

    // Sortujemy, żeby najnowsze z przeszłych były na górze
    const sortedPastReservations = pastReservations?.sort((a, b) =>
        new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
    );

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">

            {/* --- NAGŁÓWEK --- */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full mb-4 shadow-sm">
                    <History className="w-8 h-8 text-primary" />
                </div>
                <h1 className="heading-1">Reservation History</h1>
                <p className="text-gray-500 mt-2 text-sm">Review your past meetings and events.</p>
            </div>

            {/* --- LOADING --- */}
            {isLoading ? (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-primary w-10 h-10" />
                </div>
            ) : null}

            {/* --- ERROR --- */}
            {isError ? (
                <div className="w-full max-w-2xl mb-4">
                    <Alert message={error.toString()} type="error" />
                </div>
            ) : null}

            {/* --- LISTA --- */}
            <div className="w-full max-w-2xl space-y-4">

                {/* Empty State (Brak historii) */}
                {!isLoading && sortedPastReservations?.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <CalendarX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No past reservations found.</p>
                    </div>
                )}

                {/* Karty Rezerwacji */}
                {sortedPastReservations?.map(reservation => (
                    <ReservationCard key={reservation.id} {...reservation} />
                ))}
            </div>

            <Link to="/menu" className="btn-secondary w-fit mt-8">
                Go back
            </Link>
        </div>
    );
}