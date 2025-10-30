import useShowReservations from "../hooks/useShowReservations";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import Reservation from "../types/Reservation";
import {LoaderCircle} from "lucide-react";
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

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [reservation, setReservation] = useState<Reservation | null>(null)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        uiState: deleteReservationUiState,
        handleDelete,
        handleClose
    } = useDeleteReservation()

    const handleEdit = (reservation: Reservation) => {
        navigate(`/reservations/edit/${reservation.id}`)
    }

    const handleDragEnd = (reservation: Reservation, offsetX: number) => {
        if (offsetX > 100) handleEdit(reservation)
        else if (offsetX < -100) {
            setReservation(reservation)
            setShowConfirmation(true)
        }
    }
    
    return (
        <div className={"flex flex-col justify-center items-center"}>
            {isLoading || deleteReservationUiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}

            {isError ? (
                <Alert message={error.toString()} type={"error"}/>
            ) : null}

            {deleteReservationUiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert
                        message={deleteReservationUiState.success === "" ? deleteReservationUiState.error : deleteReservationUiState.success}
                        type={deleteReservationUiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}

            {showConfirmation && reservation && (
                <ConfirmationCard
                    message={"Are you sure to delete this reservation?"}
                    yesAction={async () => {
                        await handleDelete(reservation.id)
                        await queryClient.invalidateQueries({queryKey: ['showReservations']})
                        setShowConfirmation(false)
                        setReservation(null)
                    }}
                    noAction={() => {
                        setShowConfirmation(false)
                        setReservation(null)
                    }}
                />
            )}

            {reservations?.map(reservation => (
                <motion.div
                    key={reservation.id}
                    drag={!deleteReservationUiState.loading ? "x" : false}
                    onDragEnd={(_, info) => {
                    handleDragEnd(reservation, info.offset.x)
                }}
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 500, bounceDamping: 15}}
                    dragElastic={0.6}
                    whileDrag={{cursor: "grabbing"}} className="cursor-grab active:cursor-grabbing">
                    <ReservationCard {...reservation} />
                </motion.div>
            ))}

            <Link to={"/menu"}>Go back</Link>
        </div>
    )
}