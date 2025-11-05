import useShowReservations from "../hooks/useShowReservations";
import ReservationCard from "../components/ReservationCard";
import {Link} from "react-router-dom";
import Reservation from "../types/Reservation";
import {LoaderCircle} from "lucide-react";
import Alert from "../components/Alert";

export default function ShowReservationHistoryScreen() {
    const {
        data: reservations,
        isLoading,
        isError,
        error
    } = useShowReservations()

    const now = Date.now()

    const pastReservations: Reservation[] | undefined = reservations?.filter(
        reservation => {
            const endTimeMs = new Date(reservation.endTime).getTime()

            return endTimeMs < now
        }
    )

    return (
        <div className={"flex flex-col justify-center items-center"}>
            {isLoading  ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}

            {isError ? (
                <Alert message={error.toString()} type={"error"}/>
            ) : null}

            {pastReservations?.map(reservation => (
                <ReservationCard {...reservation} />
            ))}
            <Link to={"/menu"}>Go back</Link>
        </div>
    )
}