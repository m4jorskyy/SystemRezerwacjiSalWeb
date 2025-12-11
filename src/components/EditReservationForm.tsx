import { LoaderCircle } from "lucide-react";
import Alert from "./Alert";
import RoomCard from "./RoomCard";
import useFindRooms from "../hooks/useFindRooms";
import useEditReservation from "../hooks/useEditReservation";
import { Link } from "react-router-dom";
import { useState } from "react";
import RoomFilterRequest from "../types/RoomFilterRequest";
import useDebounce from "../hooks/useDebounce";

export default function EditReservationForm() {
    const {
        formData,
        setFormData,
        uiState,
        handleEditReservation,
        handleChange,
        handleClose
    } = useEditReservation();

    const now = new Date();
    const minValue = now.toISOString().slice(0, 16);

    const [extraFilters, setExtraFilters] = useState({
        capacity: 0,
        whiteboard: false,
        projector: false,
        desks: false
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setExtraFilters(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const minCapacity: number = 2;

    const roomFilterRequest: RoomFilterRequest = {
        startTime: formData.startTime,
        endTime: formData.endTime,
        ...extraFilters
    };

    const debouncedRoomFilterRequest = useDebounce(roomFilterRequest, 1000);

    const {
        data: rooms,
        isLoading: isRoomsLoading,
        isError: isRoomError,
        error: roomsError,
    } = useFindRooms(debouncedRoomFilterRequest);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 mt-4">

            {uiState.loading ? (
                <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
                    <LoaderCircle className="animate-spin text-primary w-10 h-10" />
                </div>
            ) : null}

            {uiState.showAlert ? (
                <div onClick={handleClose} className="w-full max-w-2xl mb-4 cursor-pointer">
                    <Alert
                        message={uiState.success === "" ? uiState.error : uiState.success}
                        type={uiState.success === "" ? "error" : "success"}
                    />
                </div>
            ) : null}

            <form onSubmit={handleEditReservation} className="card space-y-6 max-w-2xl w-full">

                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="heading-1">Edit Reservation</h2>
                    <p className="text-sm text-gray-500 mt-1">Update details or change the room.</p>
                </div>

                <div>
                    <label htmlFor="title" className="label-text">Reservation Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Board Meeting"
                        required
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="startTime" className="label-text">Meeting Start</label>
                        <input
                            id="startTime"
                            name="startTime"
                            type="datetime-local"
                            value={formData.startTime}
                            min={minValue}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label htmlFor="endTime" className="label-text">Meeting End</label>
                        <input
                            id="endTime"
                            name="endTime"
                            type="datetime-local"
                            value={formData.endTime}
                            min={formData.startTime}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="capacity" className="label-text">Minimum Capacity</label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min={minCapacity}
                        value={extraFilters.capacity}
                        onChange={handleFilterChange}
                        placeholder="e.g. 2"
                        className="input-field"
                    />
                </div>

                <div>
                    <span className="label-text mb-3 block">Required Equipment</span>
                    <div className="flex flex-wrap gap-6 p-4 bg-background rounded-lg border border-gray-200">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="whiteboard"
                                name="whiteboard"
                                type="checkbox"
                                checked={extraFilters.whiteboard}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Whiteboard</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="projector"
                                name="projector"
                                type="checkbox"
                                checked={extraFilters.projector}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Projector</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                id="desks"
                                name="desks"
                                type="checkbox"
                                checked={extraFilters.desks}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-sm text-gray-700">Desks</span>
                        </label>
                    </div>
                </div>

                <div className="pt-4">
                    <h3 className="label-text mb-2">Select a Room</h3>

                    {isRoomsLoading ? (
                        <div className="flex justify-center py-4">
                            <LoaderCircle className="animate-spin text-primary" />
                        </div>
                    ) : null}

                    {isRoomError ? (
                        <Alert message={roomsError.toString()} type="error" />
                    ) : null}

                    {!isRoomsLoading && rooms?.length === 0 && (
                        <p className="text-center text-gray-500 py-4 text-sm">No rooms available matching criteria.</p>
                    )}

                    <div className="flex flex-col gap-3">
                        {rooms?.map(room => (
                            <RoomCard
                                key={room.id}
                                {...room}
                                isSelected={formData.roomId === room.id}
                                onClick={() => setFormData(prev => ({...prev, roomId: room.id}))}
                            />
                        ))}
                    </div>
                </div>

                <div className="pt-2">
                    <input
                        type="submit"
                        value={uiState.loading ? "Saving..." : "Save Changes"}
                        className="btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={uiState.loading || isRoomsLoading || formData.roomId === 0}
                    />
                </div>
            </form>

            <Link to="/menu" className="btn-secondary w-fit mt-6 mb-8">Go back</Link>
        </div>
    );
}