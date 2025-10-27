import useShowRooms from "../hooks/useShowRooms";
import RoomCard from "../components/RoomCard";
import {motion} from "motion/react"
import {useState} from "react";
import {LoaderCircle} from "lucide-react";
import Alert from "../components/Alert";
import {useNavigate} from "react-router-dom";
import Room from "../types/Room";
import ConfirmationCard from "../components/ConfirmationCard";
import useDeleteRoom from "../hooks/useDeleteRoom";
import {useQueryClient} from "@tanstack/react-query";

export default function ShowRoomsScreen() {
    const {data: rooms, isLoading, isError, error} = useShowRooms()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [room, setRoom] = useState<Room | null>(null)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        uiState: deleteRoomUiState,
        handleDelete,
        handleClose
    } = useDeleteRoom()

    const handleEdit = (room: Room) => {
        navigate(`/rooms/edit/${room.id}`)
    }

    const handleDragEnd = (room: Room, offsetX: number) => {
        if (offsetX > 100) handleEdit(room)
        else if (offsetX < -100) {
            setRoom(room)
            setShowConfirmation(true)
        }
    }

    return (
        <div className={"flex flex-col justify-center items-center"}>
            {isLoading || deleteRoomUiState.loading ? (
                <LoaderCircle className={"animate-spin"}/>
            ) : null}

            {isError ? (
                <Alert message={error.toString()} type={"error"}/>
            ) : null}

            {deleteRoomUiState.showAlert ? (
                <div onClick={handleClose}>
                    <Alert
                        message={deleteRoomUiState.success === "" ? deleteRoomUiState.error : deleteRoomUiState.success}
                        type={deleteRoomUiState.success === "" ? "error" : "success"}/>
                </div>
            ) : null}

            {showConfirmation && room && (
                <ConfirmationCard
                    message={"Are you sure to delete this room?"}
                    yesAction={async () => {
                        await handleDelete(room.id)
                        await queryClient.invalidateQueries({queryKey: ['showRooms']})
                        setShowConfirmation(false)
                        setRoom(null)
                    }}
                    noAction={() => {
                        setShowConfirmation(false)
                        setRoom(null)
                    }}
                />
            )}

            {rooms?.map(room => (
                <motion.div
                    key={room.id}
                    drag={!deleteRoomUiState.loading ? "x" : false}
                    onDragEnd={(_, info) => {
                        handleDragEnd(room, info.offset.x)
                    }}
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 500, bounceDamping: 15}}
                    dragElastic={0.6}
                    whileDrag={{cursor: "grabbing"}} className="cursor-grab active:cursor-grabbing">
                    <RoomCard {...room} />
                </motion.div>
            ))}
        </div>
    )
}