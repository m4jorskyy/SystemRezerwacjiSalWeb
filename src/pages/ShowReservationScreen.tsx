import useShowReservations from "../hooks/useShowReservations";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import Reservation from "../types/Reservation";
import {LoaderCircle, Pencil, Trash2} from "lucide-react";
import Alert from "../components/Alert";
import ConfirmationCard from "../components/ConfirmationCard";
import {motion} from "motion/react";
import ReservationCard from "../components/ReservationCard";
import useDeleteReservation from "../hooks/useDeleteReservation";

export default function ShowReservationScreen() {
    const {
        data: reservations,
        isLoading,
        isError,
        error
    } = useShowReservations()

    // Filtrujemy, żeby pokazać tylko aktualne i przyszłe rezerwacje
    const now = Date.now()
    const upcomingOngoingReservations = reservations?.filter(reservation => {
        const endTimeMs = new Date(reservation.endTime).getTime()
        return endTimeMs >= now
    })

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        uiState: deleteReservationUiState,
        handleDelete,
        handleClose
    } = useDeleteReservation()

    // --- FUNKCJE POMOCNICZE (HANDLERS) ---

    // 1. Edycja
    const triggerEdit = (reservation: Reservation) => {
        navigate(`/reservations/edit/${reservation.id}`)
    }

    // 2. Usuwanie (Otwiera modal)
    const triggerDelete = (reservation: Reservation) => {
        setReservationToDelete(reservation)
        setShowConfirmation(true)
    }

    // 3. Obsługa gestu przeciągnięcia
    const handleDragEnd = (reservation: Reservation, offsetX: number) => {
        const threshold = 100 // Jak daleko trzeba przesunąć
        if (offsetX > threshold) {
            triggerEdit(reservation)
        } else if (offsetX < -threshold) {
            triggerDelete(reservation)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">

            {/* --- LOADING & ALERTS --- */}
            {isLoading || deleteReservationUiState.loading ? (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-primary w-10 h-10"/>
                </div>
            ) : null}

            {isError ? (
                <Alert message={error.toString()} type={"error"}/>
            ) : null}

            {deleteReservationUiState.showAlert ? (
                <div onClick={handleClose} className="w-full max-w-2xl mb-4 cursor-pointer">
                    <Alert
                        message={deleteReservationUiState.success === "" ? deleteReservationUiState.error : deleteReservationUiState.success}
                        type={deleteReservationUiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}

            {/* --- CONFIRMATION MODAL --- */}
            {showConfirmation && reservationToDelete && (
                <ConfirmationCard
                    message={`Are you sure you want to delete reservation "${reservationToDelete.title}"?`}
                    yesAction={async () => {
                        await handleDelete(reservationToDelete.id)
                        await queryClient.invalidateQueries({queryKey: ['showReservations']})
                        setShowConfirmation(false)
                        setReservationToDelete(null)
                    }}
                    noAction={() => {
                        setShowConfirmation(false)
                        setReservationToDelete(null)
                    }}
                />
            )}

            {/* --- LISTA REZERWACJI --- */}
            <div className="w-full max-w-2xl space-y-4">
                {upcomingOngoingReservations?.length === 0 && !isLoading && (
                    <p className="text-center text-gray-500 mt-10">No upcoming reservations found.</p>
                )}

                {upcomingOngoingReservations?.map(reservation => (
                    // WRAPPER RELATIVE (Dla tła pod spodem)
                    <div key={reservation.id} className="relative w-full group">

                        {/* WARSTWA TŁA (Widoczna przy przesuwaniu) */}
                        <div className="absolute inset-0 rounded-xl flex overflow-hidden">
                            {/* Lewa (Zielona - Edycja) */}
                            <div className="bg-green-500 w-1/2 flex items-center justify-start pl-8">
                                <Pencil className="text-white w-6 h-6" />
                            </div>
                            {/* Prawa (Czerwona - Usuwanie) */}
                            <div className="bg-red-500 w-1/2 flex items-center justify-end pr-8">
                                <Trash2 className="text-white w-6 h-6" />
                            </div>
                        </div>

                        {/* WARSTWA WIERZCHNIA (KARTA) - Przesuwalna */}
                        <motion.div
                            drag={!deleteReservationUiState.loading ? "x" : false}
                            onDragEnd={(_, info) => {
                                handleDragEnd(reservation, info.offset.x)
                            }}
                            dragConstraints={{left: 0, right: 0}} // Sprężynuje z powrotem
                            dragElastic={0.6}
                            whileDrag={{scale: 1.02, cursor: "grabbing"}}
                            // bg-surface jest KONIECZNE, żeby zakryć tło
                            className="cursor-grab active:cursor-grabbing w-full bg-surface rounded-xl relative z-10"
                        >
                            <ReservationCard
                                {...reservation}
                                // Tutaj przekazujemy funkcje do obsługi MENU (trzykropka)
                                onEdit={() => triggerEdit(reservation)}
                                onDelete={() => triggerDelete(reservation)}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>

            <Link to={"/menu"} className="btn-secondary w-fit mt-8">Go back</Link>
        </div>
    )
}