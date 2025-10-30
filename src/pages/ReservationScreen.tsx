import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function ReservationScreen() {
    const { user, logout } = useAuth()

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-2xl font-semibold mb-4">Reservation Menu</h1>

            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium">Reservations</h2>
                <Link to="/reservations/new" className="text-blue-500 hover:underline">
                    ➕ Add Reservation
                </Link>
                <Link to="/reservations/show" className="text-blue-500 hover:underline">
                    📋 Show My Reservations
                </Link>
            </div>

            {user?.role === "ADMIN" ? (
                <div className="flex flex-col gap-2 mt-6">
                    <h2 className="text-xl font-medium">Rooms</h2>
                    <Link to="/rooms/new" className="text-blue-500 hover:underline">
                        🏗️ Add Room
                    </Link>
                    <Link to="/rooms/show" className="text-blue-500 hover:underline">
                        🏢 Show All Rooms
                    </Link>
                </div>
            ) : null}

            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}