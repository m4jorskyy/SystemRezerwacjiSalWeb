import useShowRooms from "../hooks/useShowRooms";
import RoomCard from "../components/RoomCard";
import { motion } from "motion/react";
import { useState } from "react";
import { LoaderCircle, Trash2, Pencil } from "lucide-react";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import Room from "../types/Room";
import ConfirmationCard from "../components/ConfirmationCard";
import useDeleteRoom from "../hooks/useDeleteRoom";
import { useQueryClient } from "@tanstack/react-query";

export default function ShowRoomsScreen() {
    const {
        data: rooms,
        isLoading,
        isError,
        error
    } = useShowRooms();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        uiState: deleteRoomUiState,
        handleDelete,
        handleClose
    } = useDeleteRoom();

    const triggerEdit = (room: Room) => {
        navigate(`/rooms/edit/${room.id}`);
    };

    const triggerDelete = (room: Room) => {
        setRoomToDelete(room);
        setShowConfirmation(true);
    };

    const handleDragEnd = (room: Room, offsetX: number) => {
        const threshold = 100;
        if (offsetX > threshold) {
            triggerEdit(room);
        } else if (offsetX < -threshold) {
            triggerDelete(room);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            {isLoading || deleteRoomUiState.loading ? (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-primary w-10 h-10" />
                </div>
            ) : null}

            {isError ? (
                <Alert message={error.toString()} type="error" />
            ) : null}

            {deleteRoomUiState.showAlert ? (
                <div onClick={handleClose} className="mb-4 w-full max-w-2xl cursor-pointer">
                    <Alert
                        message={deleteRoomUiState.success === "" ? deleteRoomUiState.error : deleteRoomUiState.success}
                        type={deleteRoomUiState.success === "" ? "error" : "success"}
                    />
                </div>
            ) : null}

            {showConfirmation && roomToDelete && (
                <ConfirmationCard
                    message={`Are you sure you want to delete "${roomToDelete.name}"?`}
                    yesAction={async () => {
                        await handleDelete(roomToDelete.id);
                        await queryClient.invalidateQueries({ queryKey: ['showRooms'] });
                        setShowConfirmation(false);
                        setRoomToDelete(null);
                    }}
                    noAction={() => {
                        setShowConfirmation(false);
                        setRoomToDelete(null);
                    }}
                />
            )}

            <div className="w-full max-w-2xl space-y-4">
                {rooms?.map((room) => (
                    <div key={room.id} className="relative w-full group">

                        {/* --- TŁO SWIPE --- */}
                        <div className="absolute inset-0 rounded-xl flex overflow-hidden">
                            <div className="bg-green-500 w-1/2 flex items-center justify-start pl-8">
                                <Pencil className="text-white w-6 h-6" />
                            </div>
                            <div className="bg-red-500 w-1/2 flex items-center justify-end pr-8">
                                <Trash2 className="text-white w-6 h-6" />
                            </div>
                        </div>

                        <motion.div
                            drag={!deleteRoomUiState.loading ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDragEnd={(_, info) => {
                                handleDragEnd(room, info.offset.x);
                            }}
                            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                            className="relative cursor-grab active:cursor-grabbing bg-surface rounded-xl z-10"
                        >
                            <RoomCard
                                {...room}
                                // Przekazujemy funkcje do menu trzykropka
                                onEdit={() => triggerEdit(room)}
                                onDelete={() => triggerDelete(room)}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>

            <Link to="/menu" className="btn-secondary w-fit mt-8">
                Go back
            </Link>
        </div>
    );
}