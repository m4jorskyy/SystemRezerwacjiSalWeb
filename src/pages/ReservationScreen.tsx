import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {getGoogleAuthUrl} from "../utils/googleAuth";

export default function ReservationScreen() {
    const { user, logout } = useAuth()
    const location = useLocation();

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center min-h-screen">
            <h1 className={"heading-1"}> Welcome back, {user?.username}</h1>

            <div className="flex flex-col gap-2">
                <h2 className={"heading-2"}>Reservations</h2>
                <Link to="/reservations/new" className={"btn-secondary"}>
                    Add Reservation
                </Link>
                <Link to="/reservations/show" className={"btn-secondary"}>
                    Show My Reservations
                </Link>
                <Link to="/reservations/history" className={"btn-secondary"}>
                    Show My Reservations History
                </Link>
                <a href={getGoogleAuthUrl(location.pathname)} className={"btn-google"}>
                    <button>Połącz z Kalendarzem Google</button>
                </a>
            </div>

            {user?.role === "ADMIN" ? (
                <div className="flex flex-col gap-2 mt-6">
                    <h2 className="text-xl font-medium">Rooms</h2>
                    <Link to="/rooms/new" className={"btn-secondary"}>
                        Add Room
                    </Link>
                    <Link to="/rooms/show" className={"btn-secondary"}>
                        Show All Rooms
                    </Link>
                </div>
            ) : null}

            <button onClick={() => logout()} className={"btn-primary w-fit"}>Logout</button>
        </div>
    )
}