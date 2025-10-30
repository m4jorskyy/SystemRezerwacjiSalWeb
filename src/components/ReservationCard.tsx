import Reservation from "../types/Reservation";

export default function ReservationCard({id, startTime, endTime, createdAt, title, userId, roomId, roomName} : Reservation) {
    return (
        <div className="flex flex-col justify-center items-center border rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition mb-4">
            <p>Title: {title}</p>
            <p>Room name: {roomName}</p>
            <p>Start time: {startTime}</p>
            <p>End time: {endTime}</p>
        </div>
    )

}